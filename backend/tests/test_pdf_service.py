import io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from app.services.pdf_service import PDFService


def create_sample_pdf_bytes() -> bytes:
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=letter)
    c.drawString(100, 750, "Chapter 1: Principles of Computer Architecture")
    c.drawString(100, 720, "This chapter discusses Instruction Set Architecture, pipelining, and cache hierarchies.")
    c.drawString(100, 690, "1. Instruction Level Parallelism")
    c.drawString(100, 660, "2. Cache Coherence Protocols (MESI)")
    c.showPage()
    c.drawString(100, 750, "Chapter 2: Memory Hierarchy Design")
    c.drawString(100, 720, "Virtual memory addressing, TLB operation, and page table walks.")
    c.showPage()
    c.save()
    val = buf.getvalue()
    buf.close()
    return val


def test_pdf_extraction():
    pdf_bytes = create_sample_pdf_bytes()
    res = PDFService.extract_text_and_topics(pdf_bytes, "Computer_Architecture.pdf")

    assert res.pagesCount == 2
    assert "Computer Architecture" in res.extractedText
    assert len(res.detectedTopics) > 0
    assert "Instruction" in res.extractedText
