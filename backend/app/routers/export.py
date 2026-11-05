import re
from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from app.schemas.note_schema import NoteBase
from app.services.export_service import ExportService

router = APIRouter(prefix="/export", tags=["Export"])


@router.post("/pdf")
def export_pdf(note: NoteBase):
    try:
        pdf_bytes = ExportService.generate_pdf(note)
        safe_title = re.sub(r"[^a-zA-Z0-9_\-]", "_", note.title or "study_notes")
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{safe_title}.pdf"'}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(e)}")


@router.post("/png")
def export_png(note: NoteBase):
    try:
        png_bytes = ExportService.generate_png(note)
        safe_title = re.sub(r"[^a-zA-Z0-9_\-]", "_", note.title or "study_notes")
        return Response(
            content=png_bytes,
            media_type="image/png",
            headers={"Content-Disposition": f'attachment; filename="{safe_title}.png"'}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PNG generation failed: {str(e)}")
