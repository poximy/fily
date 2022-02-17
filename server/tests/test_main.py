from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_main():
    res = client.get("/")
    assert res.status_code == 404
    assert res.json() == {"detail": "Not Found"}
