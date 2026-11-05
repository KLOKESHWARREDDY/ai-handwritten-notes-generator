# REST API Documentation

The backend service runs on FastAPI and provides asynchronous REST endpoints.
Interactive Swagger documentation is available locally at:
`http://127.0.0.1:8000/docs`

---

## 1. System Endpoints

### `GET /api/health`
Checks server health, uptime status, and demo mode flag.

**Response (200 OK):**
```json
{
  "status": "healthy",
  "app": "AI Handwritten Notes Generator",
  "version": "1.0.0",
  "demo_mode": true
}
```

---

## 2. Notes Management Endpoints

### `GET /api/notes`
Retrieves all saved notes from the SQLite database, sorted by creation date descending.

**Response (200 OK):**
```json
[
  {
    "id": "sample-os-deadlock",
    "title": "Operating Systems: Deadlock & Prevention (10 Marks)",
    "topic": "Deadlock Conditions & Banker's Algorithm",
    "subject": "Operating Systems (CS301)",
    "mode": "10-mark",
    "dateStr": "15/11/2026",
    "style": {
      "font": "kalam",
      "paper": "ruled",
      "headingColor": "#1e40af",
      "bodyColor": "#18181b",
      "accentColor": "#dc2626",
      "highlightColor": "#15803d",
      "fontSize": "md",
      "lineSpacing": "normal",
      "showMargin": true,
      "showDateBox": true
    },
    "sections": [ ... ],
    "tags": ["OS", "Deadlocks"],
    "createdAt": "2026-11-05T15:25:00Z",
    "updatedAt": "2026-11-05T15:25:00Z"
  }
]
```

### `GET /api/notes/{note_id}`
Retrieves a single note by its unique identifier.

**Response (200 OK or 404 Not Found)**

### `POST /api/notes`
Creates or updates a note record.

**Request Body:** `NoteCreate` schema.  
**Response (201 Created):** `NoteResponse` object.

### `DELETE /api/notes/{note_id}`
Deletes a note record from the database.

**Response (200 OK):**
```json
{
  "message": "Note deleted successfully",
  "id": "sample-os-deadlock"
}
```

---

## 3. AI Notes Generation Endpoints

### `POST /api/ai/generate`
Synthesizes a structured exam study note from a topic prompt or syllabus text.

**Request Body:**
```json
{
  "topic": "Banker's Algorithm & Safe State",
  "subject": "Operating Systems",
  "mode": "10-mark",
  "includeDiagram": true,
  "languageMode": "english",
  "contextText": "Optional syllabus excerpt..."
}
```

**Response (200 OK):** `NoteResponse` containing formal definitions, bullet points, flowcharts, comparison tables, and scoring checklists.

---

## 4. PDF Extraction Endpoints

### `POST /api/pdf/extract`
Uploads a PDF study document, parses text page-by-page using PyMuPDF, and detects chapter topics.

**Content-Type:** `multipart/form-data`  
**Parameters:**
- `file`: PDF binary data (maximum 15MB)

**Response (200 OK):**
```json
{
  "filename": "lecture_04_os.pdf",
  "pagesCount": 12,
  "extractedText": "Chapter 4: Process Synchronization...",
  "detectedTopics": [
    "Critical Section Problem",
    "Peterson's Solution",
    "Semaphores & Mutex Locks"
  ],
  "summaryPreview": "Extracted 12 pages (18,450 chars). Detected 3 key syllabus topics ready for study sheet synthesis."
}
```

---

## 5. Export Endpoints

### `POST /api/export/pdf`
Generates a publication-quality A4 vector PDF with ruled lines and custom headers using ReportLab.

**Request Body:** `NoteBase` schema  
**Response:** `application/pdf` binary stream attachment.

### `POST /api/export/png`
Generates an A4 page PNG raster image with notebook styling using Pillow.

**Request Body:** `NoteBase` schema  
**Response:** `image/png` binary stream attachment.

---

## 6. Settings Endpoints

### `GET /api/settings`
Returns current API configuration (with API key masked or read from database).

### `POST /api/settings`
Updates default handwriting font, paper texture, target mode, and OpenAI API credentials.
