# Changelog

All notable changes to the **AI Handwritten Notes Generator** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-05

### Added
- **Core AI Engine:**
  - Automated 10-mark and 5-mark answer generation tailored for university scoring rubrics.
  - Telugu + English bilingual explanations with colloquial concept analogies and standard English terminology.
  - Automated definitions, summaries, and formula cheat sheets.
  - Built-in zero-credential Offline Demo Mode with heuristic academic synthesizer.
- **Realistic Handwriting Engine:**
  - Integrated 6 Google handwriting web fonts (`Kalam`, `Patrick Hand`, `Caveat`, `Indie Flower`, `Architects Daughter`, `Shadows Into Light`).
  - Realistic multi-color ink palettes: Royal Blue headings, Black gel body, Crimson Red caution boxes, Emerald Green highlighters, and Purple accents.
  - 4 authentic paper textures: Ruled Notebook (with red margin and punch holes), Engineering Grid, Plain Ivory A4, and Cornell Notes.
- **Visual Learning Module:**
  - Hand-drawn style flowcharts and dependency cycles with rough border outlines.
  - Hand-ruled comparison tables.
  - Boxed evaluator scoring tips and boundary conditions.
- **Document Processing & Export:**
  - PyMuPDF (`fitz`) study material and lecture PDF parser with automatic chapter topic extraction.
  - ReportLab server-side vector A4 PDF export with ruled lines and custom headers.
  - Pillow server-side PNG page image rendering.
  - Client-side instant PDF (jsPDF) and PNG (html2canvas) fallback rendering.
- **Frontend Application (React 19 + TypeScript + Vite + Tailwind CSS v4):**
  - Modern educational dashboard with 9 dedicated views: Home, Dashboard, Generate Notes, Upload PDF, Notes Editor, My Notes, Templates, Settings, About.
  - Dark/Light mode theme switching.
  - Searchable and filterable notes library with tag management.
- **Backend Architecture (FastAPI + SQLAlchemy + SQLite):**
  - Asynchronous REST API with Pydantic v2 schemas.
  - Persistent SQLite database storage.
  - Secure environment configuration via `pydantic-settings`.
- **Quality Assurance & CI:**
  - Comprehensive Pytest test suite covering AI, PDF, Export, and Notes CRUD APIs.
  - GitHub Actions CI workflow testing both frontend build and backend tests.
