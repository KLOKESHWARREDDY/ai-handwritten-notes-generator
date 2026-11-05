from fastapi.testclient import TestClient
from app.main import app, seed_database
from app.database import init_db

# Ensure database is initialized for tests
init_db()
seed_database()


def test_health_endpoint():
    with TestClient(app) as client:
        response = client.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "app" in data


def test_notes_crud_lifecycle():
    with TestClient(app) as client:
        # 1. Get initial notes
        res = client.get("/api/notes")
        assert res.status_code == 200
        assert isinstance(res.json(), list)

        # 2. Create note
        payload = {
            "id": "test-api-lifecycle-note",
            "title": "API Test Note: Graph Traversal",
            "topic": "BFS and DFS Algorithms",
            "subject": "Data Structures",
            "mode": "5-mark",
            "dateStr": "01/12/2026",
            "style": {
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
            "sections": [
                {
                    "id": "s1",
                    "type": "definition",
                    "title": "BFS Definition",
                    "content": "Breadth First Search explores neighbor vertices level by level using a Queue (FIFO).",
                    "keywords": ["Queue", "FIFO", "Level by Level"],
                }
            ],
            "tags": ["DSA", "Graphs"],
        }
        create_res = client.post("/api/notes", json=payload)
        assert create_res.status_code == 201
        created_data = create_res.json()
        assert created_data["id"] == "test-api-lifecycle-note"

        # 3. Retrieve note
        get_res = client.get("/api/notes/test-api-lifecycle-note")
        assert get_res.status_code == 200
        assert get_res.json()["title"] == "API Test Note: Graph Traversal"

        # 4. Delete note
        del_res = client.delete("/api/notes/test-api-lifecycle-note")
        assert del_res.status_code == 200


def test_ai_generate_endpoint():
    with TestClient(app) as client:
        payload = {
            "topic": "TCP Three-Way Handshake",
            "subject": "Computer Networks",
            "mode": "5-mark",
            "includeDiagram": True,
        }
        res = client.post("/api/ai/generate", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert "title" in data
        assert len(data["sections"]) > 0


def test_settings_endpoint():
    with TestClient(app) as client:
        get_res = client.get("/api/settings")
        assert get_res.status_code == 200
        data = get_res.json()
        assert "demoMode" in data

        # Update
        payload = {
            "openaiApiKey": "",
            "selectedModel": "gpt-4o-mini",
            "demoMode": True,
            "defaultFont": "patrick",
            "defaultPaper": "grid",
            "defaultMode": "5-mark",
        }
        post_res = client.post("/api/settings", json=payload)
        assert post_res.status_code == 200
        assert post_res.json()["defaultFont"] == "patrick"
