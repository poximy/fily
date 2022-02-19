from typing import Optional

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from ..auth import create_token, hash_password, verify_password

router = APIRouter()


class PostUser(BaseModel):
    user_id: int
    pseudonimo: str
    email: str
    phone: Optional[str] = None
    password: str
    seller: bool = False
    reputation: float = 0
    money: float = 0
    freeze_money: float = 0


class Login(BaseModel):
    email: str
    password: str


@router.post("/signup")
async def sign_up(user: PostUser, request: Request):
    sqlite = request.state.sqlite
    # create table if not exists
    cursor = await sqlite.execute("""
    SELECT
        *
    FROM
        users
    WHERE
        id = ?""", (user.user_id,))

    await sqlite.commit()
    row = await cursor.fetchone()
    if row:
        raise HTTPException(status_code=400, detail="User already exists")

    # create user
    cursor = await sqlite.execute(
        """INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""", (
            user.user_id,
            user.pseudonimo,
            user.email,
            user.phone,
            hash_password(user.password),
            user.seller,
            user.reputation,
            user.money,
            user.freeze_money
        )
        )
    await sqlite.commit()
    return {"user created": user.pseudonimo}


@router.post("/login")
async def login(request: Request, data: Login):
    # check if user exists
    sqlite = request.state.sqlite
    cursor = await sqlite.execute("""
        SELECT
            *
        FROM
            users
        WHERE
            email = ?""", (data.email,))
    await sqlite.commit()
    user = await cursor.fetchone()
    if user is None:
        raise HTTPException(status_code=400, detail="User does not exist")

    # check if password is correct
    if not verify_password(data.password, user[4]):
        raise HTTPException(status_code=400, detail="Incorrect password")

    return create_token({"user_id": user[0]})
