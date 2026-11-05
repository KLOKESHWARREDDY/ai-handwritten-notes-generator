import io
from typing import List
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Frame, PageTemplate
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas
from PIL import Image, ImageDraw, ImageFont

from app.schemas.note_schema import NoteBase, NoteSection


class NumberedCanvas(canvas.Canvas):
    """
    Custom ReportLab canvas that draws authentic student notebook paper background:
    - Light blue horizontal ruled lines
    - Red vertical margin line on the left
    - Date and Page Number box in header
    - Stamp at bottom
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_notebook_background(num_pages)
            super().showPage()
        super().save()

    def draw_notebook_background(self, total_pages: int):
        self.saveState()
        width, height = A4

        # 1. Background clean paper tint
        self.setFillColor(colors.HexColor("#FFFFFF"))
        self.rect(0, 0, width, height, fill=1, stroke=0)

        # 2. Draw light blue ruled lines across the page
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.6)
        line_spacing = 26
        y = height - 70
        while y > 40:
            self.line(40, y, width - 40, y)
            y -= line_spacing

        # 3. Draw Red left margin line
        margin_x = 75
        self.setStrokeColor(colors.HexColor("#F87171"))
        self.setLineWidth(1.2)
        self.line(margin_x, 30, margin_x, height - 30)

        # 4. Top Header Line & Date/Page Box
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(1.0)
        self.line(40, height - 45, width - 40, height - 45)

        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#1E3A8A"))
        self.drawString(margin_x + 10, height - 38, "STUDENT STUDY REVISION SHEET")

        # Date & Page Box
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#475569"))
        page_str = f"Page {self._pageNumber} of {total_pages}"
        self.drawRightString(width - 50, height - 38, page_str)

        # 5. Bottom Exam Footer
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.line(40, 35, width - 40, 35)
        self.setFont("Helvetica-Oblique", 7)
        self.setFillColor(colors.HexColor("#94A3B8"))
        self.drawString(margin_x + 10, 24, "AI Handwritten Notes Generator - Open Source Examination Edition")

        self.restoreState()


class ExportService:
    @staticmethod
    def generate_pdf(note: NoteBase) -> bytes:
        """
        Generates a high-resolution A4 study note PDF using ReportLab
        with ruled notebook lines, blue headings, black body, and red caution boxes.
        """
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            leftMargin=85,
            rightMargin=45,
            topMargin=55,
            bottomMargin=45,
        )

        styles = getSampleStyleSheet()

        # Custom typography styles mimicking student handwriting
        title_style = ParagraphStyle(
            "NoteTitle",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=22,
            textColor=colors.HexColor(note.style.headingColor or "#1E40AF"),
            alignment=1,  # Center
            spaceAfter=14,
        )

        heading_style = ParagraphStyle(
            "NoteHeading",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=17,
            textColor=colors.HexColor(note.style.headingColor or "#1E40AF"),
            spaceBefore=10,
            spaceAfter=6,
        )

        body_style = ParagraphStyle(
            "NoteBody",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=15,
            textColor=colors.HexColor(note.style.bodyColor or "#18181B"),
            spaceAfter=8,
        )

        def_style = ParagraphStyle(
            "NoteDef",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=15,
            textColor=colors.HexColor("#1E3A8A"),
        )

        alert_style = ParagraphStyle(
            "NoteAlert",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=14,
            textColor=colors.HexColor("#991B1B"),
        )

        elements = []

        # Document Title
        elements.append(Paragraph(note.title, title_style))
        elements.append(Spacer(1, 8))

        # Render sections
        for idx, sec in enumerate(note.sections):
            # Section heading
            if sec.title and sec.type not in ["important_box", "table", "diagram"]:
                elements.append(Paragraph(f"{idx + 1}. {sec.title}", heading_style))

            # Definition Box
            if sec.type == "definition":
                content_text = ExportService._highlight_keywords(sec.content or "", sec.keywords or [])
                def_table = Table(
                    [[Paragraph(f"<b>Definition:</b> {content_text}", def_style)]],
                    colWidths=[460],
                )
                def_table.setStyle(TableStyle([
                    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EFF6FF")),
                    ('LINELEFT', (0,0), (-1,-1), 3.5, colors.HexColor("#2563EB")),
                    ('TOPPADDING', (0,0), (-1,-1), 6),
                    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
                    ('LEFTPADDING', (0,0), (-1,-1), 10),
                    ('RIGHTPADDING', (0,0), (-1,-1), 8),
                ]))
                elements.append(def_table)
                elements.append(Spacer(1, 10))

            # Bullet points
            elif sec.type == "bullet_points" and sec.items:
                for item in sec.items:
                    formatted_item = ExportService._highlight_keywords(item, sec.keywords or [])
                    elements.append(Paragraph(f"&bull; {formatted_item}", body_style))
                elements.append(Spacer(1, 6))

            # Red Alert / Caution Box
            elif sec.type == "important_box":
                alert_rows = []
                alert_rows.append([Paragraph(f"<b>IMPORTANT EXAM WARNING: {sec.title or 'Exam Tips'}</b>", alert_style)])
                if sec.content:
                    alert_rows.append([Paragraph(sec.content, body_style)])
                if sec.items:
                    for pt in sec.items:
                        alert_rows.append([Paragraph(f"&bull; {pt}", alert_style)])

                box_table = Table(alert_rows, colWidths=[460])
                box_table.setStyle(TableStyle([
                    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FEF2F2")),
                    ('BOX', (0,0), (-1,-1), 1.5, colors.HexColor("#EF4444")),
                    ('TOPPADDING', (0,0), (-1,-1), 6),
                    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
                    ('LEFTPADDING', (0,0), (-1,-1), 10),
                    ('RIGHTPADDING', (0,0), (-1,-1), 10),
                ]))
                elements.append(box_table)
                elements.append(Spacer(1, 10))

            # Comparison Table
            elif sec.type == "table" and sec.tableData:
                table_content = []
                # Headers
                header_row = [Paragraph(f"<b>{h}</b>", def_style) for h in sec.tableData.headers]
                table_content.append(header_row)
                # Rows
                for row in sec.tableData.rows:
                    table_content.append([Paragraph(cell, body_style) for cell in row])

                col_w = 460 / max(len(sec.tableData.headers), 1)
                rep_table = Table(table_content, colWidths=[col_w] * len(sec.tableData.headers))
                rep_table.setStyle(TableStyle([
                    ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
                    ('GRID', (0,0), (-1,-1), 0.8, colors.HexColor("#94A3B8")),
                    ('TOPPADDING', (0,0), (-1,-1), 5),
                    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
                    ('LEFTPADDING', (0,0), (-1,-1), 6),
                    ('RIGHTPADDING', (0,0), (-1,-1), 6),
                ]))
                elements.append(Paragraph(f"<b>Table: {sec.tableData.title}</b>", heading_style))
                elements.append(rep_table)
                elements.append(Spacer(1, 10))

            # Telugu Explanation Box
            elif sec.type == "telugu_explanation":
                telugu_rows = []
                telugu_rows.append([Paragraph(f"<b>తెలుగు + English: {sec.title or 'Concept'}</b>", def_style)])
                if sec.content:
                    telugu_rows.append([Paragraph(sec.content, body_style)])
                if sec.teluguContent:
                    telugu_rows.append([Paragraph(f"<i>{sec.teluguContent}</i>", body_style)])

                t_table = Table(telugu_rows, colWidths=[460])
                t_table.setStyle(TableStyle([
                    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FAF5FF")),
                    ('BOX', (0,0), (-1,-1), 1.2, colors.HexColor("#A855F7")),
                    ('TOPPADDING', (0,0), (-1,-1), 6),
                    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
                    ('LEFTPADDING', (0,0), (-1,-1), 10),
                    ('RIGHTPADDING', (0,0), (-1,-1), 10),
                ]))
                elements.append(t_table)
                elements.append(Spacer(1, 10))

            # Paragraph
            elif sec.type == "paragraph" and sec.content:
                formatted_para = ExportService._highlight_keywords(sec.content, sec.keywords or [])
                elements.append(Paragraph(formatted_para, body_style))
                elements.append(Spacer(1, 6))

        doc.build(elements, canvasmaker=NumberedCanvas)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes

    @staticmethod
    def generate_png(note: NoteBase) -> bytes:
        """
        Generates an authentic student notebook page as a PNG image using Pillow
        """
        width = 1200
        height = 1700
        image = Image.new("RGB", (width, height), color="#FFFFFF")
        draw = ImageDraw.Draw(image)

        # 1. Ruled lines
        line_color = "#E2E8F0"
        line_spacing = 38
        y = 120
        while y < height - 60:
            draw.line([(60, y), (width - 60, y)], fill=line_color, width=1)
            y += line_spacing

        # 2. Red margin line
        margin_x = 120
        draw.line([(margin_x, 40), (margin_x, height - 40)], fill="#F87171", width=2)

        # 3. Top Header
        draw.text((margin_x + 20, 50), f"SUBJECT: {note.subject or 'EXAM PREP'}  |  DATE: {note.dateStr or '2026'}", fill="#475569")
        draw.text((margin_x + 20, 80), note.title, fill=note.style.headingColor or "#1E40AF")

        # 4. Render main points
        curr_y = 140
        for idx, sec in enumerate(note.sections[:6]):
            if sec.title:
                draw.text((margin_x + 20, curr_y), f"{idx+1}. {sec.title}", fill=note.style.headingColor or "#1E40AF")
                curr_y += 35

            if sec.content:
                words = sec.content.split()
                line = ""
                for w in words:
                    if len(line) + len(w) > 65:
                        draw.text((margin_x + 25, curr_y), line, fill=note.style.bodyColor or "#18181B")
                        curr_y += 30
                        line = w + " "
                    else:
                        line += w + " "
                if line:
                    draw.text((margin_x + 25, curr_y), line, fill=note.style.bodyColor or "#18181B")
                    curr_y += 35

            if sec.items:
                for item in sec.items[:3]:
                    draw.text((margin_x + 25, curr_y), f"• {item[:70]}", fill="#18181B")
                    curr_y += 30

            curr_y += 15
            if curr_y > height - 120:
                break

        # Save to PNG buffer
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        png_bytes = buffer.getvalue()
        buffer.close()
        return png_bytes

    @staticmethod
    def _highlight_keywords(text: str, keywords: List[str]) -> str:
        res = text
        for kw in keywords:
            if kw and len(kw) > 1:
                # Wrap in green color highlight markup for ReportLab
                res = res.replace(kw, f'<font color="#15803D"><b>{kw}</b></font>')
        return res
