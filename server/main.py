import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from src.routes import auth, products, users
from src.settings import redisdb, server, sqlitedb

redis = None
sqlite = None


async def create_tables(sqlite):
    # Create initial tables
    # with user reference table
    await sqlite.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pseudonimo TEXT, email TEXT, phone TEXT,
            password TEXT, seller BOOLEAN, reputation FLOAT,
            money FLOAT, freeze_money FLOAT,
            FOREIGN KEY(id) REFERENCES user_id(id))
            """)
    await sqlite.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT, name TEXT, description TEXT,
            total_buy INTEGER,
            FOREIGN KEY(id) REFERENCES product_id(id))
            """)
    await sqlite.commit()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    global redis
    global sqlite
    redis = redisdb()
    sqlite = await sqlitedb()
    await create_tables(sqlite)


@app.on_event("shutdown")
async def shutdown_event():
    await redis.close()
    await sqlite.close()


@app.middleware("http")
async def database(request: Request, call_next):
    # Database State
    global redis
    global sqlite
    request.state.redis = redis
    request.state.sqlite = sqlite

    response = await call_next(request)
    return response


route_prefix = "/api"
app.include_router(products.router, prefix=route_prefix + "/products")
app.include_router(auth.router, prefix=route_prefix + "/auth")
app.include_router(users.router, prefix=route_prefix + "/users")

if __name__ == "__main__":
    server(uvicorn.run)
