from datetime import timedelta
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENVIRONMENT: Literal["production", "local"] = "production"
    UVICORN_HOST: str = "0.0.0.0"
    UVICORN_PORT: int = 5050

    CHROMA_HOST: str = "0.0.0.0"
    CHROMA_PORT: int = 8000

    GPT_MODEL: str = "gpt-3.5-turbo"
    GPT_API_ENDPOINT: str = "https://api.openai.com/v1/chat/completions"

    OPENAI_API_KEY: str

    APP_PASSWORD: str
    SESSION_TIMEOUT: timedelta = timedelta(seconds=30)

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="allow",
    )
