from datetime import datetime, timedelta
from typing import Union

from jose import JWTError, jwt
from passlib.context import CryptContext

from .settings import config

crypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
jwt_algorithm = "HS256"
jwt_key = config.jwt_key


def hash_password(password: str) -> str:
    return crypt_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return crypt_context.verify(plain_password, hashed_password)


def get_header_token(header: dict):
    try:
        auth_header = header.get("authorization")
        if auth_header is None:
            return None
        bearer, token = auth_header.split()
        if bearer == "Bearer":
            return token
    except Exception:
        return None


def create_token(data: dict):
    # Makes a copy so the original data is not modified
    # This data will be encoded inside the JWT
    encode = data.copy()
    expire = datetime.now() + timedelta(days=3)
    encode.update({"exp": expire})

    # Creates a JWT
    encoded_jwt = jwt.encode(encode, jwt_key, algorithm=jwt_algorithm)
    return encoded_jwt


def verify_token(token: str) -> Union[str, None]:
    # Verifies if the data has not been modified
    try:
        token_data = jwt.decode(token, jwt_key, algorithms=jwt_algorithm)
        user_id = token_data.get("user_id")
        return user_id
    except JWTError:
        return None
