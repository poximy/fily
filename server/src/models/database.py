import aioredis


def redis(url: str, username: str, password: str):
    uri = f"redis://{url}"
    connection = aioredis.from_url(
        uri,
        username=username,
        password=password
    )

    return connection
