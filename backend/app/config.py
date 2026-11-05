import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "AI Handwritten Notes Generator"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # OpenAI Credentials & Models
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    DEMO_MODE: bool = True  # Defaults to True so app functions immediately out of the box
    
    # Database
    DATABASE_URL: str = "sqlite:///./handwritten_notes.db"
    
    # Security & Uploads
    MAX_FILE_SIZE_MB: int = 15
    ALLOWED_EXTENSIONS: List[str] = [".pdf"]
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()

# Automatically adjust demo mode if key is explicitly set
if settings.OPENAI_API_KEY and len(settings.OPENAI_API_KEY.strip()) > 10:
    settings.DEMO_MODE = False
