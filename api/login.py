import os

from dotenv import load_dotenv
from fastapi import Request
from fastapi.routing import APIRouter

load_dotenv()
PASSWORD = os.getenv("APP_PASSWORD")

router = APIRouter()


@router.post("/api/login")
async def login(request: Request):
    data = await request.json()
    if data["password"] == PASSWORD:
        return {"success": True}
    return {"success": False, "message": "Invalid password"}
