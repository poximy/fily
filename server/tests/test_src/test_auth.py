from src.auth import create_token, verify_token, hash_password, verify_password


def test_token():
    user_id = 100
    token_data = {"user_id": user_id}
    token_data_copy = token_data.copy()
    token = create_token(token_data)

    verified_token = verify_token(token)

    assert token_data == token_data_copy
    assert verified_token is not None
    assert verified_token == user_id


def test_hashing():
    password = "QWERTYqwerty!@#$%^123456"
    hashed_password = hash_password(password)

    assert verify_password(password, hashed_password)
