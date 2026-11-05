import asyncio
from app.schemas.ai_schema import AIGenerateRequest
from app.services.ai_service import AIService


def test_generate_10_mark_note():
    req = AIGenerateRequest(
        topic="Virtual Memory and Paging",
        subject="Operating Systems",
        mode="10-mark",
        includeDiagram=True,
    )
    note = asyncio.run(AIService.generate_note(req))
    assert note is not None
    assert "Virtual Memory" in note.title or "Virtual Memory" in note.topic
    assert len(note.sections) >= 3
    # Verify section types
    section_types = [s.type for s in note.sections]
    assert "definition" in section_types
    assert "important_box" in section_types
    assert "diagram" in section_types


def test_generate_telugu_english_note():
    req = AIGenerateRequest(
        topic="Neural Networks Backpropagation",
        subject="Deep Learning",
        mode="telugu-english",
        languageMode="telugu_english",
    )
    note = asyncio.run(AIService.generate_note(req))
    assert note is not None
    section_types = [s.type for s in note.sections]
    assert "telugu_explanation" in section_types
    telugu_sec = next(s for s in note.sections if s.type == "telugu_explanation")
    assert telugu_sec.teluguContent is not None
    assert len(telugu_sec.teluguContent) > 0
