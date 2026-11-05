from app.routers.notes import router as notes_router
from app.routers.ai import router as ai_router
from app.routers.pdf import router as pdf_router
from app.routers.export import router as export_router
from app.routers.settings import router as settings_router

__all__ = [
    "notes_router",
    "ai_router",
    "pdf_router",
    "export_router",
    "settings_router",
]
