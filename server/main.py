import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from src.routes import products
from src.settings import redisdb, server, sqlitedb

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def database(request: Request, call_next):
    # Database State
    request.state.redis = redis
    request.state.sqlite = sqlite

    response = await call_next(request)
    return response


@app.on_event("startup")
async def startup_event():
    global sqlite
    sqlite = await sqlitedb()

    global redis
    redis = redisdb()


@app.on_event("shutdown")
async def shutdown_event():
    await redis.close()
    await sqlite.close()

route_prefix = "/api"

app.include_router(products.router, prefix=route_prefix + "/products")

if __name__ == "__main__":
    server(uvicorn.run)
