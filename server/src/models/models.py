from typing import List, Literal

import strawberry


# Product model
@strawberry.type
class Product:
    user_id: int
    product_id: int
    category: str
    name: str
    description: str
    total_buy: float  # price for buy the product inmediately
    actual_bid: float
    remaining_time: float
    bid_status: Literal["active", "inactive", "finished"]
    bid_quantity: int
    creation_date: str


# User model
@strawberry.type
class User:
    user_id: str  # unique Nickname
    pseudonimo: str
    password: str
    user_list: List[Product]
    money: float
    seller: bool
    freeze_money: float
    seller_list: List[Product]
    reputation: float
