import os
import uuid
from datetime import datetime, timedelta
from typing import Dict

from dotenv import load_dotenv
from fastapi import Depends, HTTPException, Request
from fastapi.routing import APIRouter

load_dotenv()
PASSWORD = os.getenv("APP_PASSWORD")

router = APIRouter()

sessions: Dict[str, Dict] = {}
SESSION_TIMEOUT = timedelta(seconds=30)


def get_session(token: str):
    session = sessions.get(token)
    if not session or datetime.now() - session["last_activity"] > SESSION_TIMEOUT:
        sessions.pop(token, None)
        raise HTTPException(status_code=401, detail="Session expired or invalid")
    session["last_activity"] = datetime.now()
    return session


@router.post("/api/login")
async def login(request: Request):
    data = await request.json()
    if data["password"] == PASSWORD:
        existing_token = next(
            (
                token
                for token, session in sessions.items()
                if session["last_activity"] > datetime.now() - SESSION_TIMEOUT
            ),
            None,
        )
        if existing_token:
            raise HTTPException(status_code=401, detail="A session is already active")
        token = str(uuid.uuid4())
        sessions[token] = {"last_activity": datetime.now()}
        return {"success": True, "token": token}
    return {"success": False, "message": "Invalid password"}


@router.post("/api/logout")
async def logout(request: Request):
    data = await request.json()
    token = data.get("token")
    if token in sessions:
        sessions.pop(token, None)
        return {"success": True}
    raise HTTPException(status_code=401, detail="Invalid or expired session")


@router.get("/api/protected")
async def protected(token: str = Depends(get_session)):
    return {"message": "You are logged in"}
