import orjson
from fastapi import APIRouter, HTTPException, Request, BackgroundTasks
from pydantic import BaseModel
from src.auth import verify_token, get_header_token, create_token

router = APIRouter()


class PostProduct(BaseModel):
    category: str
    name: str
    description: str
    total_buy: int


@router.get("/{product_id}")
async def get_product(request: Request, product_id: int):
    redis = request.state.redis
    sqlite = request.state.sqlite

    value = await redis.get(product_id)
    if value is None:
        # If value is not found in redis look inside sql
        cursor = await sqlite.execute("SELECT * FROM products WHERE product_id = ?", (product_id,))
        data = await cursor.fetchone()
        if data is None:
            raise HTTPException(status_code=404, detail=f"Product with id: {product_id} not found")  
        return {
            "data": {
                "product_id": data[0]
            }
        }

    data = orjson.loads(value)
    return {
        "data": {
            product_id: data
        }
    }


@router.post("/")
async def add_product(background: BackgroundTasks, request: Request, product: PostProduct):
    # Can only post product if user was verified with phone number
    # redis = request.state.redis
    sqlite = request.state.sqlite
    header = request.headers

    token = get_header_token(header)
    if token is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    user_id = verify_token(token)
    if user_id is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    # The product is saved to the database and we obtain the product_id
    data = product.dict()
    values = [data[key] for key in data.keys()]
    # create table if not exists
    cursor = await sqlite.execute("""CREATE TABLE IF NOT EXISTS products
                                        (product_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        category TEXT,
                                        name TEXT,
                                        description TEXT,
                                        total_buy INTEGER)""")
    cursor = await sqlite.execute("INSERT INTO products (category, name, description, total_buy) VALUES (?, ?, ?, ?)", values)
    # sql_data = await cursor.fetchall()
    await sqlite.commit()
    # product_id = sql_data[0]
    # product_id = sql_data

    # json = orjson.dumps(data)
    # await redis.set(product_id, json)

    # # TODO function that save the data in sqlite
    # return {
    #     "data": {
    #         product_id: data
    #     }
    # }


@router.delete("/product/{product_id}")
async def delete_product(request: Request, product_id: int):
    # Can only delete product if product_id belongs to user
    redis = request.state.redis
    value = await redis.delete(product_id)
    if value == 0:
        return HTTPException(status_code=400, detail="No product found")
    return {"data": f"Product with id: {product_id} was deleted"}


# Time: O(n), Space O(1)
# products.sort(reverse=asc, key=lambda item: item["category"])  # we sort the list by category
# if category is None:
#     return products
# products[0]

# i = 0
# while i < len(products):
#     current_product = products[i]
#     if current_product["category"] != category:  # if the category is not the same, we delete the product
#         del products[i]
#     else:
#         i += 1
# return products

# data = {"user_id": 100}

# token = create_token(data)
# print(token)