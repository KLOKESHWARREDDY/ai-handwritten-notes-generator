from typing import Optional
from pydantic import BaseModel, Field


class AIGenerateRequest(BaseModel):
    topic: str = Field(..., min_length=2, max_length=300)
    subject: Optional[str] = Field(None, max_length=200)
    mode: str = "10-mark"  # 10-mark, 5-mark, telugu-english, summary, definitions, comprehensive
    contextText: Optional[str] = None
    includeDiagram: Optional[bool] = True
    languageMode: Optional[str] = "english"  # english, telugu_english
    model: Optional[str] = None
