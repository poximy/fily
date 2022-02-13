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
    remaining_time: float
    creation_date: str
    bid_quantity: int = 0
    current_bid: float = 0
    bid_status: Literal["active", "inactive", "finished"] = "inactive"


# User model
@strawberry.type
class User:
    user_id: str  # unique Nickname
    pseudonimo: str
    password: str
    seller: bool = False
    reputation: float = 0
    money: float = 0
    freeze_money: float = 0
    user_list: List[Product] = []
    seller_list: List[Product] = []
