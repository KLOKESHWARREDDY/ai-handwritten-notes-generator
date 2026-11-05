from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.models.note_model import NoteModel, SettingsModel
from app.routers import (
    notes_router,
    ai_router,
    pdf_router,
    export_router,
    settings_router,
)


def seed_database():
    """Initializes tables and seeds initial sample notes for student exam prep"""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(NoteModel).count() == 0:
            sample_note = NoteModel(
                id="sample-os-deadlock",
                title="Operating Systems: Deadlock & Prevention (10 Marks)",
                topic="Deadlock Conditions & Banker's Algorithm",
                subject="Operating Systems (CS301)",
                mode="10-mark",
                date_str="15/11/2026",
                style={
                    "font": "kalam",
                    "paper": "ruled",
                    "headingColor": "#1e40af",
                    "bodyColor": "#18181b",
                    "accentColor": "#dc2626",
                    "highlightColor": "#15803d",
                    "fontSize": "md",
                    "lineSpacing": "normal",
                    "showMargin": True,
                    "showDateBox": True,
                },
                sections=[
                    {
                        "id": "s1",
                        "type": "definition",
                        "title": "Definition: Deadlock",
                        "content": "A deadlock is a situation in an operating system where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.",
                        "keywords": ["Deadlock", "Blocked Processes", "Resource Allocation", "Mutual Waiting"]
                    },
                    {
                        "id": "s2",
                        "type": "important_box",
                        "title": "Coffman Conditions (All 4 must hold simultaneously)",
                        "items": [
                            "1. Mutual Exclusion: At least one resource must be non-shareable.",
                            "2. Hold & Wait: A process holds at least one resource and is waiting for others.",
                            "3. No Preemption: Resources cannot be forcibly confiscated from a process.",
                            "4. Circular Wait: A closed loop exists where P0 waits for P1, and Pn waits for P0."
                        ],
                        "keywords": ["Mutual Exclusion", "Hold & Wait", "No Preemption", "Circular Wait"]
                    },
                    {
                        "id": "s3",
                        "type": "diagram",
                        "title": "Deadlock Circular Wait Flowchart",
                        "diagramData": {
                            "type": "cycle",
                            "title": "Circular Wait Resource Dependency",
                            "nodes": [
                                {"id": "p1", "label": "Process P1", "sublabel": "Holds R1, Wants R2", "color": "blue"},
                                {"id": "r2", "label": "Resource R2", "sublabel": "Allocated to P2", "color": "purple"},
                                {"id": "p2", "label": "Process P2", "sublabel": "Holds R2, Wants R1", "color": "red"},
                                {"id": "r1", "label": "Resource R1", "sublabel": "Allocated to P1", "color": "green"},
                            ],
                            "links": [
                                {"from": "p1", "to": "r2", "label": "Requests"},
                                {"from": "r2", "to": "p2", "label": "Assigned to"},
                                {"from": "p2", "to": "r1", "label": "Requests"},
                                {"from": "r1", "to": "p1", "label": "Assigned to"},
                            ]
                        }
                    },
                    {
                        "id": "s4",
                        "type": "table",
                        "title": "Comparison: Deadlock Prevention vs Avoidance",
                        "tableData": {
                            "title": "Prevention vs Avoidance Comparison",
                            "headers": ["Parameter", "Deadlock Prevention", "Deadlock Avoidance"],
                            "rows": [
                                ["Core Mechanism", "Eliminates at least 1 of 4 Coffman conditions", "Dynamically evaluates resource allocation state"],
                                ["Resource Utilization", "Low (Strict conservative rules)", "High (Allows requests if state is safe)"],
                                ["Key Algorithm", "Spooling, Resource Ordering", "Banker's Algorithm, Safety Algorithm"],
                                ["Prior Knowledge", "No future request knowledge needed", "Requires maximum resource claim in advance"]
                            ]
                        }
                    }
                ],
                tags=["OS", "Deadlocks", "B.Tech Exam Prep", "10-Marker"],
            )
            db.add(sample_note)
            db.commit()

        if db.query(SettingsModel).count() == 0:
            db_settings = SettingsModel(
                id="default",
                openai_api_key=settings.OPENAI_API_KEY,
                selected_model=settings.OPENAI_MODEL,
                demo_mode=settings.DEMO_MODE,
                default_font="kalam",
                default_paper="ruled",
                default_mode="10-mark",
            )
            db.add(db_settings)
            db.commit()
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize DB and seeds
    seed_database()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Backend API for AI Handwritten Notes Generator - Examination Preparation Platform",
    lifespan=lifespan,
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Sub-routers under /api
app.include_router(notes_router, prefix="/api")
app.include_router(ai_router, prefix="/api")
app.include_router(pdf_router, prefix="/api")
app.include_router(export_router, prefix="/api")
app.include_router(settings_router, prefix="/api")


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "demo_mode": settings.DEMO_MODE,
    }


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.APP_NAME} API",
        "docs_url": "/docs",
        "health": "/api/health",
    }
