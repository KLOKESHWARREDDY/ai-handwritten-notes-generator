from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Boolean, DateTime, JSON
from app.database import Base


def utc_now():
    return datetime.now(timezone.utc)


class NoteModel(Base):
    __tablename__ = "notes"

    id = Column(String(64), primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    topic = Column(String(255), nullable=False)
    subject = Column(String(255), nullable=True)
    mode = Column(String(64), nullable=False, default="10-mark")
    date_str = Column(String(32), nullable=True)
    style = Column(JSON, nullable=False)
    sections = Column(JSON, nullable=False)
    tags = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)


class SettingsModel(Base):
    __tablename__ = "app_settings"

    id = Column(String(32), primary_key=True, default="default")
    openai_api_key = Column(String(255), default="")
    selected_model = Column(String(64), default="gpt-4o-mini")
    demo_mode = Column(Boolean, default=True)
    default_font = Column(String(32), default="kalam")
    default_paper = Column(String(32), default="ruled")
    default_mode = Column(String(32), default="10-mark")
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)
