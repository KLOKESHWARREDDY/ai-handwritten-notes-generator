from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.note_model import SettingsModel, NoteModel
from app.schemas.ai_schema import AIGenerateRequest
from app.schemas.note_schema import NoteResponse
from app.services.ai_service import AIService

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/generate", response_model=NoteResponse)
async def generate_note(req: AIGenerateRequest, db: Session = Depends(get_db)):
    try:
        # Check if an API key is stored in database settings
        settings_record = db.query(SettingsModel).filter(SettingsModel.id == "default").first()
        api_key = settings_record.openai_api_key if settings_record else None

        generated_note = await AIService.generate_note(req, api_key=api_key)

        # Save to database automatically
        new_note = NoteModel(
            id=generated_note.id,
            title=generated_note.title,
            topic=generated_note.topic,
            subject=generated_note.subject,
            mode=generated_note.mode,
            date_str=generated_note.dateStr,
            style=generated_note.style.model_dump(),
            sections=[s.model_dump() for s in generated_note.sections],
            tags=generated_note.tags or [],
        )
        db.add(new_note)
        db.commit()

        return generated_note
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")
