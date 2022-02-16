import aioredis
import aiosqlite


def redis(url: str, username: str, password: str):
    uri = f"redis://{url}"
    connection = aioredis.from_url(
        uri,
        username=username,
        password=password
    )

    return connection


async def sqlite(path: str):
    return await aiosqlite.connect(path)
