import pytest
from fastapi.testclient import TestClient
from fastapi import HTTPException, status
from main import app
from login import (
    create_access_token, 
    decode_access_token, 
    get_session
)

client = TestClient(app())


def test_create_access_token():
    token = create_access_token({"sub": "user"}, 1)
    assert isinstance(token, str)


def test_decode_access_token():
    decoded_token = decode_access_token(create_access_token({"sub": "user"}, 1))
    assert isinstance(decoded_token, dict)
    assert decoded_token["sub"] == "user"
    assert "exp" in decoded_token

    with pytest.raises(HTTPException) as e:
        decode_access_token("invalid_token")
        assert e.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_session():
    token = create_access_token({"sub": "user"}, 1)
    session = get_session(token)
    assert isinstance(session, dict)
    assert session["sub"] == "user"
    assert "exp" in session

    with pytest.raises(HTTPException) as e:
        get_session("wrong_token")
        assert e.status_code == status.HTTP_401_UNAUTHORIZED

    token = create_access_token({"sub": "user"}, -1)
    with pytest.raises(HTTPException) as e:
        get_session(token)
        assert e.status_code == status.HTTP_401_UNAUTHORIZED


def test_login():
    response = client.post("/api/login", data={"username": "admin", "password": "admin"})
    assert response.status_code == status.HTTP_200_OK
    assert "access_token" in response.json()

    response = client.post("/api/login", data={"username": "admin", "password": "invalid"})
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

    response = client.post("/api/login", data={"username": "invalid", "password": "admin"})
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_protected():
    token = create_access_token({"sub": "admin"}, 1)
    response = client.get(f"/api/protected?token={token}")
    assert response.status_code == status.HTTP_200_OK

    token = create_access_token({"sub": "admin"}, -1)
    response = client.get(f"/api/protected?token={token}")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
