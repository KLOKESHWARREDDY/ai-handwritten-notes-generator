from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.note_model import SettingsModel
from app.schemas.note_schema import AppSettingsSchema
from app.config import settings

router = APIRouter(prefix="/settings", tags=["Settings"])


@router.get("", response_model=AppSettingsSchema)
def get_settings(db: Session = Depends(get_db)):
    rec = db.query(SettingsModel).filter(SettingsModel.id == "default").first()
    if not rec:
        return AppSettingsSchema(
            openaiApiKey=settings.OPENAI_API_KEY,
            selectedModel=settings.OPENAI_MODEL,
            demoMode=settings.DEMO_MODE,
            defaultFont="kalam",
            defaultPaper="ruled",
            defaultMode="10-mark",
        )
    return AppSettingsSchema(
        openaiApiKey=rec.openai_api_key or "",
        selectedModel=rec.selected_model or "gpt-4o-mini",
        demoMode=rec.demo_mode,
        defaultFont=rec.default_font or "kalam",
        defaultPaper=rec.default_paper or "ruled",
        defaultMode=rec.default_mode or "10-mark",
    )


@router.post("", response_model=AppSettingsSchema)
def save_settings(data: AppSettingsSchema, db: Session = Depends(get_db)):
    rec = db.query(SettingsModel).filter(SettingsModel.id == "default").first()
    if not rec:
        rec = SettingsModel(id="default")
        db.add(rec)

    rec.openai_api_key = data.openaiApiKey or ""
    rec.selected_model = data.selectedModel
    rec.demo_mode = data.demoMode
    rec.default_font = data.defaultFont
    rec.default_paper = data.defaultPaper
    rec.default_mode = data.defaultMode

    db.commit()
    db.refresh(rec)

    return data
