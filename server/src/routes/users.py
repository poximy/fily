from typing import Optional

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from ..auth import hash_password

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
        user_id = ?""", (user.user_id,))

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
async def login(user: PostUser, request: Request):
    # check if user exists
    sqlite = request.state.sqlite
    cursor = await sqlite.execute("""
        SELECT
            *
        FROM
            users
        WHERE
            user_id = ?""", (user.user_id,))
    await sqlite.commit()
    row = await cursor.fetchone()
    if not row:
        raise HTTPException(status_code=400, detail="User does not exist")

    # check if password is correct
    if not row[4] == hash_password(user.password):
        raise HTTPException(status_code=400, detail="Incorrect password")

    return {"user": row[0]}
