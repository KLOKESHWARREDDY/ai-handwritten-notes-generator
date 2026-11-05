from typing import List
from pydantic import BaseModel


class PDFExtractResponse(BaseModel):
    filename: str
    pagesCount: int
    extractedText: str
    detectedTopics: List[str]
    summaryPreview: str
