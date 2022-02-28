from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from ..auth import create_token, hash_password, verify_password

router = APIRouter()


class CreateUser(BaseModel):
    nick: str
    email: str
    password: str
    phone: str = ""


class Login(BaseModel):
    email: str
    password: str


@router.post("/signup")
async def sign_up(request: Request, user: CreateUser):
    sqlite = request.state.sqlite

    cursor = await sqlite.execute("""
    SELECT
        *
    FROM
        users
    WHERE
        email = ?""", (user.email,))

    # Verifies if user does not exists
    await sqlite.commit()
    already_exists = await cursor.fetchone()
    if already_exists is not None:
        raise HTTPException(status_code=400, detail="User already exists")

    # Create user
    hashed_password = hash_password(user.password)
    cursor = await sqlite.execute("""
    INSERT INTO users (
        seller, reputation, money, freeze_money,
        verified, nick, email, password, phone
    )
    VALUES
        (
            FALSE,
            0.0,
            0.0,
            0.0,
            FALSE,
            ?,
            ?,
            ?,
            ?""", (user.nick, user.email, user.phone, hashed_password))

    await sqlite.commit()
    return {"message": "user created"}


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
