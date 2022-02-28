import pytest
from fastapi.exceptions import HTTPException
from src.auth import (authenticated, create_token, get_header_token,
                      hash_password, verify_password, verify_token)


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


def test_get_header_token():
    token = "randomtoken123456789"
    header = {
        "authorization": "Bearer" + " " + token
    }
    header_token = get_header_token(header)
    assert token == header_token

    no_bearer = {"authorization": "nobearertoken"}
    header_token = get_header_token(no_bearer)
    assert header_token is None


def test_authenticated():
    with pytest.raises(HTTPException):
        authenticated(None) is None
