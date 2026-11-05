# AI Handwritten Notes Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python Version](https://img.shields.io/badge/Python-3.11%20%7C%203.12%20%7C%203.14-blue)](https://www.python.org/)
[![React Version](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Pytest-Passing-brightgreen)](backend/tests/)

> **An AI-powered educational platform that transforms PDFs, syllabus topics, and study materials into beautiful handwritten-style notes, exam answers, diagrams, and revision resources tailored for college semester examinations.**

---

## 1. Project Introduction

**AI Handwritten Notes Generator** is an open-source educational platform designed to help college and university students prepare for examinations with visually engaging, structured, handwritten-style study notes.

Instead of reading overwhelming textbooks or generic, dense ChatGPT responses, this platform synthesizes syllabus topics into authentic student revision sheets—complete with ruled notebook lines, left red margins, blue ballpoint headings, black gel body text, red caution boxes, green highlighted keywords, hand-drawn flowcharts, comparison tables, and Telugu-English bilingual explanations.

---

## 2. Problem Statement

College students preparing for semester examinations face several recurring hurdles:
- **Evaluator Criteria:** University evaluators award higher marks to structured answers containing clear definitions, bullet points, flowcharts, and highlighted keywords.
- **Cognitive Overload:** 500-page textbooks and continuous plain text lecture notes are difficult to memorize quickly during exam weeks.
- **Language Barriers:** Non-native English speakers often struggle to grasp complex technical topics without bilingual analogies in their native language (such as Telugu paired with English technical terms).
- **Time Constraints:** Manually drawing flowcharts and handwriting neat summary sheets takes hours before each exam.

**AI Handwritten Notes Generator** solves this by generating ready-to-print, high-scoring A4 handwritten study sheets in seconds.

---

## 3. Features

### A. AI Exam Notes Generator
- **Topic to Notes:** Enter any topic, question, or course unit to synthesize an examination-ready study sheet.
- **Target Answer Formats:**
  - **10-Mark Answer:** Formal definitions, Coffman conditions/core mechanisms, flowcharts, comparison grids, formulas, and examiner scoring tips.
  - **5-Mark Answer:** Concise definitions, 4-5 high-yield bullet points, and quick takeaway tips.
  - **Definitions & Formulas:** Precise glossaries and mathematical formulas.
  - **Revision Summary:** Rapid bullet-point cheat sheets for revision before entering the exam hall.
  - **Telugu-English Bilingual Mode:** Native Telugu colloquial concept analogies combined with standard English technical vocabulary.

### B. Authentic Handwriting Engine
- **Multiple Handwriting Fonts:**
  - `Kalam`: Crisp, neat student handwriting (great for exam sheets).
  - `Patrick Hand`: Clean printed teacher / student handwriting.
  - `Caveat`: Natural casual cursive handwriting.
  - `Indie Flower`: Bubbly, warm student style.
  - `Architects Daughter`: Sharp technical blueprint handwriting.
  - `Shadows Into Light`: Fine gel pen handwriting.
- **Realistic Multi-Color Ink Palette:**
  - **Royal Blue Ink:** Section headings with hand-drawn wavy underlines.
  - **Black Gel Ink:** Body text and clear bullet points.
  - **Crimson Red Ink:** Important alert boxes, common pitfalls, and examiner cautions.
  - **Emerald Green Highlighter:** Automatic keyword highlighting.
  - **Purple Accents:** Bilingual native-language callouts.
- **Paper Styles:**
  - **Ruled Notebook:** Light blue horizontal ruling with red vertical left margin and binder rings.
  - **Engineering Grid:** Graph paper styling for math and technical diagrams.
  - **Plain Ivory:** Crisp clean white A4 paper.
  - **Cornell Format:** Left recall cue column, main notes column, and bottom summary box.

### C. Visual Learning & Diagram Generator
- **Hand-Drawn Flowcharts:** Visual execution paths with hand-drawn box borders and sketched connector arrows.
- **Comparison Tables:** Hand-ruled comparison grids contrasting parameters side by side.
- **Examiner Tip Boxes:** Highlighted caution cards highlighting frequently lost marks.

### D. Handwriting Studio & Live Editor
- **Real-Time Live Preview:** True-to-scale A4 page simulation.
- **Full Customization:** Toggle fonts, line spacing, margins, and paper backgrounds on the fly.
- **WYSIWYG Section Editor:** Add, edit, reorder, or delete definitions, diagrams, and bullet points.

### E. Export & Library
- **Download A4 PDF:** High-resolution vector PDF generation via ReportLab (with client-side jsPDF fallback).
- **Export Page as PNG:** Crisp 2x resolution canvas export using Pillow / html2canvas.
- **Direct Printing:** Standardized A4 print stylesheet.
- **Saved Library:** Search, filter, tag, and manage all your revision sheets locally or in SQLite.

---

## 4. System Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Frontend (React 19)                  │
│   Vite • TypeScript • Tailwind CSS v4 • Lucide Icons   │
└───────────────────────────┬────────────────────────────┘
                            │ REST API (JSON / Multipart)
┌───────────────────────────▼────────────────────────────┐
│                  Backend (FastAPI)                     │
│  FastAPI • Pydantic v2 • SQLAlchemy • SQLite Database  │
└───────┬───────────────────┬───────────────────┬────────┘
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
│   OpenAI API   │  │ PyMuPDF (fitz) │  │   ReportLab    │
│  GPT-4o-mini   │  │  PDF Parser &  │  │    & Pillow    │
│ & Demo Engine  │  │ Topic Detector │  │ Export Engine  │
└────────────────┘  └────────────────┘  └────────────────┘
```

### Application Page Structure
1. **Home / Landing:** Interactive hero with live A4 notebook simulation and instant exam topic demos.
2. **Dashboard:** Student exam overview, recent sheets, quick stats, and quick generation cards.
3. **Generate Notes:** Topic input, format selector (5-mark, 10-mark, summary, Telugu-English).
4. **Upload PDF:** PyMuPDF extraction, detected syllabus topics selector, and document text preview.
5. **Notes Editor & Studio:** Live A4 paper canvas, font picker, ink selector, and section editor.
6. **My Notes:** Searchable and filterable library of all generated study notes.
7. **Templates:** Pre-built exam note blueprints (10-mark engineering, 5-mark formula sheet, Cornell, Telugu-English).
8. **Settings:** OpenAI API key configuration, model picker (`gpt-4o-mini`, `gpt-4o`), and offline Demo mode toggle.
9. **About Project:** Architecture details, mission statement, and open-source license.

---

## 5. Getting Started

### Prerequisites
- **Python:** 3.11, 3.12, or 3.14
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/KLOKESHWARREDDY/ai-handwritten-notes-generator.git
cd ai-handwritten-notes-generator
```

---

### Step 2: Backend Setup

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # On Windows (PowerShell):
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # On macOS / Linux:
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create your `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

5. Start the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   *The interactive Swagger API documentation will be accessible at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).*

---

### Step 3: Frontend Setup

1. Open a new terminal window and navigate to `frontend/`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will open at [http://localhost:5173](http://localhost:5173).*

---

## 6. Environment Configuration

Edit your `.env` file to configure application settings:

| Variable | Default | Description |
| :--- | :--- | :--- |
| `OPENAI_API_KEY` | `""` | Your OpenAI API key. Leave empty for offline Demo Mode. |
| `OPENAI_MODEL` | `gpt-4o-mini` | Target AI model (`gpt-4o-mini`, `gpt-4o`, `gpt-3.5-turbo`). |
| `DEMO_MODE` | `true` | When `true`, runs the offline synthesizer without calling OpenAI. |
| `DATABASE_URL` | `sqlite:///./handwritten_notes.db` | SQLAlchemy database connection string. |
| `MAX_FILE_SIZE_MB` | `15` | Maximum PDF file upload size limit in megabytes. |

---

## 7. Running Tests

Run the backend test suite:
```bash
cd backend
python -m pytest
```

Run the frontend typecheck and production build:
```bash
cd frontend
npm run build
```

---

## 8. Documentation Index

- [Project Architecture](PROJECT_ARCHITECTURE.md)
- [API Documentation](API_DOCUMENTATION.md)
- [Installation Guide](INSTALLATION.md)
- [Changelog](CHANGELOG.md)
- [Project Roadmap](ROADMAP.md)
- [Security Policy](SECURITY.md)
- [Contribution Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

---

## 9. License

This project is licensed under the [MIT License](LICENSE).
