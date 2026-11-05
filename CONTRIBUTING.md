# Contributing to AI Handwritten Notes Generator

Thank you for your interest in contributing to **AI Handwritten Notes Generator**! We welcome contributions from college students, educators, developers, and designers worldwide.

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

### 1. Reporting Bugs
- Search existing GitHub issues to make sure the bug hasn't already been reported.
- If not, open a new issue using our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md).
- Include steps to reproduce, expected results, and browser/Python version details.

### 2. Suggesting Features
- We love ideas for new handwriting fonts, exam formats, multilingual explanations, and paper styles!
- Open an issue using the [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md).

### 3. Local Development Setup

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ai-handwritten-notes-generator.git
   cd ai-handwritten-notes-generator
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Linux/macOS:
   source venv/bin/activate

   pip install -r requirements.txt
   uvicorn app.main:app --reload --port 8000
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Running Tests**
   ```bash
   # Backend pytest
   cd backend && python -m pytest

   # Frontend build & typecheck
   cd frontend && npm run build
   ```

### 4. Submitting a Pull Request (PR)
- Create a new branch: `git checkout -b feature/your-feature-name`
- Write clear, commented, and type-safe code.
- Ensure all tests pass before opening your PR.
- Commit your changes with descriptive commit messages.
- Open a PR with a description of what you implemented or fixed.
