from typing import Callable, Literal

import pydantic
from pydantic import BaseSettings


class Settings(BaseSettings):
    # Environment variables (.env)
    environment: Literal["production", "development"] = "development"
    port: int = 8000

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


def server(func: Callable):
    try:
        config = Settings()
        commands = {
            "app": "main:app",
            "port": config.port
        }

        if config.environment == "development":
            commands["reload"] = True

        func(**commands)
    except pydantic.error_wrappers.ValidationError as error:
        print(error.json())
