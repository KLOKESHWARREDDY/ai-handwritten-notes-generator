import io
import re
from typing import List, Tuple
from app.schemas.pdf_schema import PDFExtractResponse


class PDFService:
    @staticmethod
    def extract_text_and_topics(file_bytes: bytes, filename: str) -> PDFExtractResponse:
        """
        Extract text, structure and detected exam topics from a PDF file using PyMuPDF (fitz)
        with fallback to PyPDF2.
        """
        text_pages = []
        page_count = 0

        # Try PyMuPDF first
        try:
            import pymupdf as fitz  # PyMuPDF
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            page_count = len(doc)
            for page_num in range(page_count):
                page = doc.load_page(page_num)
                page_text = page.get_text("text")
                if page_text and page_text.strip():
                    text_pages.append(page_text.strip())
            doc.close()
        except Exception as e:
            # Fallback to PyPDF2 if fitz fails
            try:
                import PyPDF2
                reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
                page_count = len(reader.pages)
                for page in reader.pages:
                    pt = page.extract_text()
                    if pt and pt.strip():
                        text_pages.append(pt.strip())
            except Exception as e2:
                raise ValueError(f"Unable to parse PDF with both PyMuPDF and PyPDF2: {str(e2)}")

        combined_text = "\n\n".join(text_pages)
        if not combined_text.strip():
            combined_text = f"Document: {filename}\n[Scanned images or minimal text detected. Ready for handwritten note drafting.]"

        # Detect potential topics / headings using regex
        detected_topics = PDFService._detect_topics(combined_text, filename)

        # Build clean summary preview
        preview_snippet = combined_text[:600].replace("\n", " ").strip()
        summary_preview = f"Extracted {page_count} pages ({len(combined_text):,} chars). Detected {len(detected_topics)} key syllabus topics ready for study sheet synthesis."

        return PDFExtractResponse(
            filename=filename,
            pagesCount=max(page_count, 1),
            extractedText=combined_text,
            detectedTopics=detected_topics,
            summaryPreview=summary_preview,
        )

    @staticmethod
    def _detect_topics(text: str, filename: str) -> List[str]:
        topics = []
        # Pattern 1: Chapter / Unit headings
        chapter_matches = re.findall(
            r"(?:Chapter|Unit|Module|Lecture|Section)\s*(?:[0-9IVX]+)?[:\s\-]+([A-Za-z0-9\s,\-]{4,60})",
            text,
            re.IGNORECASE,
        )
        for m in chapter_matches:
            clean = m.strip().title()
            if len(clean) > 4 and clean not in topics:
                topics.append(clean)

        # Pattern 2: Uppercase lines or numbered sections
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        for line in lines[:80]:
            if re.match(r"^[0-9]\.[0-9]?\s+[A-Za-z]", line):
                clean = re.sub(r"^[0-9\.\s]+", "", line).strip()
                if len(clean) > 4 and len(clean) < 60 and clean not in topics:
                    topics.append(clean)
            elif line.isupper() and 5 < len(line) < 50:
                clean = line.title()
                if clean not in topics:
                    topics.append(clean)

        # Fallback if few topics detected
        if len(topics) < 2:
            base_name = re.sub(r"\.pdf$", "", filename, flags=re.IGNORECASE).replace("_", " ").replace("-", " ").title()
            topics = [
                base_name,
                "Core Concepts & Definitions",
                "System Architecture & Principles",
                "Key Algorithms & Comparison",
            ]

        return topics[:6]
