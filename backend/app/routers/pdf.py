from fastapi import APIRouter, UploadFile, File, HTTPException
from app.config import settings
from app.schemas.pdf_schema import PDFExtractResponse
from app.services.pdf_service import PDFService

router = APIRouter(prefix="/pdf", tags=["PDF"])


@router.post("/extract", response_model=PDFExtractResponse)
async def extract_pdf(file: UploadFile = File(...)):
    filename = file.filename or "uploaded_study_material.pdf"

    # 1. Extension check
    if not filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Only PDF (.pdf) files are supported."
        )

    # 2. Read bytes with size protection
    contents = await file.read()
    max_bytes = settings.MAX_FILE_SIZE_MB * 1024 * 1024
    if len(contents) > max_bytes:
        raise HTTPException(
            status_code=413,
            detail=f"File exceeds maximum allowed size of {settings.MAX_FILE_SIZE_MB}MB."
        )

    if len(contents) == 0:
        raise HTTPException(
            status_code=400,
            detail="The uploaded PDF file is empty."
        )

    try:
        result = PDFService.extract_text_and_topics(contents, filename)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to extract PDF contents: {str(e)}"
        )
