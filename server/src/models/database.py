import aioredis


def connection(url: str, username: str, password: str):
    uri = f"redis://{url}"
    connection = aioredis.from_url(
        uri,
        username=username,
        password=password
    )

    return connection
