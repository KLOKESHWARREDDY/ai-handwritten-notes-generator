# Project Architecture & Technical Specifications

## 1. Architectural Overview

**AI Handwritten Notes Generator** employs a modular client-server architecture:
- **Client (Frontend):** Modern Single Page Application (SPA) built with React 19, TypeScript, Vite, and Tailwind CSS v4.
- **Server (Backend):** Asynchronous REST API service powered by Python 3, FastAPI, SQLAlchemy ORM, and SQLite.
- **AI Synthesis Pipeline:** Dual-mode architecture combining OpenAI's GPT models (`gpt-4o-mini`, `gpt-4o`) with an offline academic heuristic synthesizer.
- **Document & Graphic Engines:** PyMuPDF (`fitz`) for PDF parsing, ReportLab for publication-grade A4 PDF vector generation, and Pillow for raster image processing.

```
┌────────────────────────────────────────────────────────┐
│                   Frontend (React 19)                  │
│       Pages • Handwriting Studio • Theme Switcher       │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP / JSON / Multipart
┌───────────────────────────▼────────────────────────────┐
│                  Backend (FastAPI)                     │
│    Routers: /notes, /ai, /pdf, /export, /settings      │
└───────┬───────────────────┬───────────────────┬────────┘
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
│   OpenAI API   │  │ PyMuPDF Engine │  │ ReportLab/PIL  │
│  GPT-4o-mini   │  │ Document Parse │  │ Export Engine  │
└───────┬────────┘  └───────┬────────┘  └───────┬────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│               SQLite Database (SQLAlchemy)             │
│            Notes Storage & App Preferences             │
└────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Subsystems

### A. Handwriting Simulation Layer
The handwriting effect is achieved through coordinated CSS typography and canvas geometry:
1. **Font Injection:** Google web fonts with authentic cursive/print kerning (`Kalam`, `Patrick Hand`, `Caveat`, `Indie Flower`, `Architects Daughter`, `Shadows Into Light`).
2. **Paper Rulers (`paper-ruled`):** Created via multi-layered CSS linear gradients simulating 32px notebook rulings and vertical red margin lines at 80px offset.
3. **Paper Grids (`paper-grid`):** 24px Cartesian grid pattern for mathematics and engineering topics.
4. **Cornell Layout (`paper-cornell`):** Dual-column layout with 200px cue margin and bottom synthesis summary block.

### B. Visual Learning Components
- **`HandDrawnDiagram.tsx`:** Renders circular cycles and sequential flows with organic borders (`border-radius: 255px 15px 225px 15px/15px 225px 15px 255px`) and sketched SVG arrows.
- **`HandDrawnTable.tsx`:** Comparison tables styled to resemble hand-ruled notebook tables.
- **`KeywordHighlight.tsx`:** Regular expression tokenizer that applies a realistic translucent green marker gradient (`linear-gradient(104deg, rgba(187,247,208,0.75)...)`).

---

## 3. Backend Subsystems

### A. AI Synthesis Pipeline (`ai_service.py`)
- **Strict JSON Enforcement:** Utilizes structured response format with explicit schema validation.
- **Dual Engine:**
  - **Live Mode:** Dispatches asynchronous prompts to OpenAI with low temperature (0.4) for technical accuracy.
  - **Offline Demo Mode:** Heuristic engine that generates rich definitions, 4-point exam breakdowns, lifecycle flowcharts, comparison grids, and Telugu explanations without external network calls.

### B. PDF Document Extractor (`pdf_service.py`)
- **PyMuPDF (`fitz`):** Extracts raw text, line heights, and structural blocks page-by-page.
- **Regex Heading Extractor:** Detects chapter and section titles to automatically suggest high-yield exam topics.
- **Fault-Tolerant Fallback:** Automatic fallback to PyPDF2 if non-standard binary encodings occur.

### C. Server-Side Document Exporter (`export_service.py`)
- **ReportLab Canvas:** Implements a two-pass `NumberedCanvas` that draws notebook ruling lines, red vertical margins, page headers, and footer stamps behind document flowables.
- **Pillow Canvas:** Generates high-DPI raster images for thumbnail previews and PNG downloads.

---

## 4. Security Architecture

1. **Server-Side API Key Storage:** Frontend code never stores or transmits raw OpenAI API keys. Keys reside in backend environment variables or encrypted database rows.
2. **File Upload Restrictions:**
   - Strict extension validation (`.pdf`).
   - File size upper bound enforced at 15 MB.
   - Immediate in-memory processing without writing arbitrary executable files to host disk.
3. **Cross-Origin Resource Sharing (CORS):** Strict origin headers configurable via `.env`.
