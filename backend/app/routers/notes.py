from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.note_model import NoteModel
from app.schemas.note_schema import NoteCreate, NoteResponse

router = APIRouter(prefix="/notes", tags=["Notes"])


@router.get("", response_model=List[NoteResponse])
def get_notes(db: Session = Depends(get_db)):
    notes = db.query(NoteModel).order_by(NoteModel.created_at.desc()).all()
    results = []
    for n in notes:
        results.append(
            NoteResponse(
                id=n.id,
                title=n.title,
                topic=n.topic,
                subject=n.subject,
                mode=n.mode,
                dateStr=n.date_str,
                style=n.style,
                sections=n.sections,
                tags=n.tags or [],
                createdAt=n.created_at.isoformat() if n.created_at else None,
                updatedAt=n.updated_at.isoformat() if n.updated_at else None,
            )
        )
    return results


@router.get("/{note_id}", response_model=NoteResponse)
def get_note(note_id: str, db: Session = Depends(get_db)):
    note = db.query(NoteModel).filter(NoteModel.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return NoteResponse(
        id=note.id,
        title=note.title,
        topic=note.topic,
        subject=note.subject,
        mode=note.mode,
        dateStr=note.date_str,
        style=note.style,
        sections=note.sections,
        tags=note.tags or [],
        createdAt=note.created_at.isoformat() if note.created_at else None,
        updatedAt=note.updated_at.isoformat() if note.updated_at else None,
    )


@router.post("", response_model=NoteResponse, status_code=status.HTTP_201_CREATED)
def create_or_update_note(note_in: NoteCreate, db: Session = Depends(get_db)):
    existing = db.query(NoteModel).filter(NoteModel.id == note_in.id).first()

    # Convert Pydantic models to dicts for JSON columns
    style_dict = note_in.style.model_dump()
    sections_list = [s.model_dump() for s in note_in.sections]

    if existing:
        existing.title = note_in.title
        existing.topic = note_in.topic
        existing.subject = note_in.subject
        existing.mode = note_in.mode
        existing.date_str = note_in.dateStr
        existing.style = style_dict
        existing.sections = sections_list
        existing.tags = note_in.tags
        db.commit()
        db.refresh(existing)
        target = existing
    else:
        new_note = NoteModel(
            id=note_in.id,
            title=note_in.title,
            topic=note_in.topic,
            subject=note_in.subject,
            mode=note_in.mode,
            date_str=note_in.dateStr,
            style=style_dict,
            sections=sections_list,
            tags=note_in.tags or [],
        )
        db.add(new_note)
        db.commit()
        db.refresh(new_note)
        target = new_note

    return NoteResponse(
        id=target.id,
        title=target.title,
        topic=target.topic,
        subject=target.subject,
        mode=target.mode,
        dateStr=target.date_str,
        style=target.style,
        sections=target.sections,
        tags=target.tags or [],
        createdAt=target.created_at.isoformat() if target.created_at else None,
        updatedAt=target.updated_at.isoformat() if target.updated_at else None,
    )


@router.delete("/{note_id}")
def delete_note(note_id: str, db: Session = Depends(get_db)):
    note = db.query(NoteModel).filter(NoteModel.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(note)
    db.commit()
    return {"message": "Note deleted successfully", "id": note_id}
