import orjson
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from src.auth import authenticated, get_header_token

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
        cursor = await sqlite.execute("""
        SELECT
            category, name, description, total_buy
        FROM
            products
        WHERE
            product_id = ?
        """, (product_id,))

        sql_data = await cursor.fetchone()
        if sql_data is None:
            raise HTTPException(
                status_code=404,
                detail=f"Product with id: {product_id} not found")
        data = {
            "category": sql_data[0],
            "name": sql_data[1],
            "description": sql_data[2],
            "total_buy": sql_data[3]
        }
        json = orjson.dumps(data)
        await redis.set(product_id, json, ex=300)
        return {
            "data": {
                "product_id": product_id,
                **data
            }
        }

    data = orjson.loads(value)
    return {
        "data": {
            "product_id": product_id,
            **data
        }
    }


@router.post("/")
async def add_product(
        request: Request,
        product: PostProduct):
    redis = request.state.redis
    sqlite = request.state.sqlite
    header = request.headers

    # Can only post product if user was verified with phone number
    # TODO add number verification
    token = get_header_token(header)
    # TODO Add user_id to product
    user_id = authenticated(token)
    product_data = product.dict()

    # The product is saved to the database and so we can obtain the product_id
    # create table if not exists
    await sqlite.execute("""
        CREATE TABLE IF NOT EXISTS products (
            product_id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT, name TEXT, description TEXT,
            total_buy INTEGER)
            """)
    cursor = await sqlite.execute(
        """INSERT INTO products (
                category,
                name,
                description,
                total_buy
            )
            VALUES (?, ?, ?, ?)""", (
                product_data["category"],
                product_data["name"],
                product_data["description"],
                product_data["total_buy"]))
    await sqlite.commit()
    product_id = cursor.lastrowid

    json = orjson.dumps(product_data)
    await redis.set(product_id, json, ex=300)

    return {
        "data": {
            "product_id": product_id,
            **product_data
        }
    }


@router.delete("/{product_id}")
async def delete_product(request: Request, product_id: int):
    # Can only delete product if product_id belongs to user
    redis = request.state.redis
    sqlite = request.state.sqlite
    header = request.headers

    token = get_header_token(header)
    user_id = authenticated(token)

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
