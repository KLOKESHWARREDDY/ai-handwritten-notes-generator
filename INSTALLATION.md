# Installation & Setup Guide

This guide details the complete step-by-step setup for both development and production environments.

---

## 1. Prerequisites

Ensure your system meets the following requirements:
- **Operating System:** Windows 10/11, macOS Monterey+, or Ubuntu 22.04+
- **Python:** 3.11, 3.12, or 3.14 (`python --version`)
- **Node.js:** v18.0.0 or higher (`node -v`)
- **Package Manager:** npm v9+ or pnpm / yarn

---

## 2. Clone the Repository

```bash
git clone https://github.com/KLOKESHWARREDDY/ai-handwritten-notes-generator.git
cd ai-handwritten-notes-generator
```

---

## 3. Backend Setup (FastAPI & Python)

1. Open a terminal in the project root:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   # On Windows (PowerShell):
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # On macOS / Linux:
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Upgrade pip and install dependencies:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   *(Optional: Add your `OPENAI_API_KEY="sk-..."` in `.env`. If left empty, the application runs in offline demo mode automatically).*

5. Run database migrations / seed verification:
   ```bash
   python -c "from app.database import init_db; init_db()"
   ```

6. Start the backend server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   Backend runs at: `http://127.0.0.1:8000`  
   Interactive API documentation: `http://127.0.0.1:8000/docs`

---

## 4. Frontend Setup (React & Vite)

1. In a separate terminal, navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install npm packages:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Frontend runs at: `http://localhost:5173`

---

## 5. Verification & Testing

Verify that everything works properly:

```bash
# Run backend pytest suite
cd backend
python -m pytest

# Run frontend build & typecheck
cd ../frontend
npm run build
```
