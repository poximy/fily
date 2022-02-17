from typing import Callable, Literal

import pydantic
from pydantic import BaseSettings

from .models import database


class Settings(BaseSettings):
    # Environment variables (.env)
    jwt_key: str
    redis_url: str
    redis_user: str
    redis_password: str
    sqlite_path: str = ":memory:"
    environment: Literal["production", "development"] = "development"
    port: int = 8000

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


config = Settings()


def server(func: Callable):
    try:
        commands = {
            "app": "main:app",
            "port": config.port
        }

        if config.environment == "development":
            commands["reload"] = True

        func(**commands)
    except pydantic.error_wrappers.ValidationError as error:
        print(error.json())


def redisdb():
    redis_settings = {
        "url": config.redis_url,
        "username": config.redis_user,
        "password": config.redis_password,
    }

    return database.redis(**redis_settings)


async def sqlitedb():
    path = config.sqlite_path
    return await database.sqlite(path)
