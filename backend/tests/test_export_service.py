from app.schemas.note_schema import NoteBase, NoteStyleConfig, NoteSection, TableData
from app.services.export_service import ExportService


def get_test_note():
    return NoteBase(
        id="test-note-1",
        title="Microprocessor 8086 Architecture",
        topic="8086 Pin Diagram & Registers",
        subject="Computer Engineering",
        mode="10-mark",
        dateStr="20/11/2026",
        style=NoteStyleConfig(
            font="kalam",
            paper="ruled",
            headingColor="#1e40af",
            bodyColor="#18181b",
            accentColor="#dc2626",
            highlightColor="#15803d",
            fontSize="md",
            lineSpacing="normal",
            showMargin=True,
            showDateBox=True,
        ),
        sections=[
            NoteSection(
                id="sec-1",
                type="definition",
                title="8086 Overview",
                content="The 8086 is a 16-bit microprocessor with a 20-bit address bus capable of addressing 1MB of memory.",
                keywords=["16-bit", "1MB memory", "20-bit address"],
            ),
            NoteSection(
                id="sec-2",
                type="important_box",
                title="Exam Scoring Rule",
                content="Always draw the Bus Interface Unit (BIU) and Execution Unit (EU) separately.",
                items=["BIU has 6-byte instruction queue", "EU has ALU and General Purpose Registers"],
                keywords=["BIU", "EU"],
            ),
            NoteSection(
                id="sec-3",
                type="table",
                title="BIU vs EU Comparison",
                tableData=TableData(
                    title="BIU vs EU",
                    headers=["Unit", "Primary Function", "Registers"],
                    rows=[
                        ["BIU", "Fetches instructions & calculates physical address", "CS, DS, SS, ES, IP"],
                        ["EU", "Executes decoded instructions via ALU", "AX, BX, CX, DX, SP, BP"],
                    ],
                ),
            ),
        ],
        tags=["Microprocessors", "8086", "Hardware"],
    )


def test_export_pdf():
    note = get_test_note()
    pdf_bytes = ExportService.generate_pdf(note)
    assert pdf_bytes is not None
    assert len(pdf_bytes) > 500
    assert pdf_bytes.startswith(b"%PDF")


def test_export_png():
    note = get_test_note()
    png_bytes = ExportService.generate_png(note)
    assert png_bytes is not None
    assert len(png_bytes) > 500
    # PNG signature check
    assert png_bytes.startswith(b"\x89PNG")
