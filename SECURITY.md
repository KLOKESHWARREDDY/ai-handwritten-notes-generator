# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Architecture & Best Practices

AI Handwritten Notes Generator implements strict security safeguards:
1. **API Key Isolation:** OpenAI API keys are kept strictly on the backend and are never sent or exposed to frontend client code.
2. **Environment Variable Configuration:** Real credentials are read via `.env` and excluded from version control via `.gitignore`.
3. **Upload Validation:** PDF file uploads are verified against strict extension checks (`.pdf`), empty byte detection, and a 15MB file size ceiling.
4. **Input Sanitation:** All incoming request payloads are validated and parsed through strict Pydantic schemas.
5. **Offline Demo Mode:** To prevent accidental API billing during development, the application includes a full-featured offline demo mode that operates with zero network credentials.

## Reporting a Vulnerability

If you discover any security vulnerability, please report it responsibly by contacting the maintainers directly or opening a confidential security advisory on GitHub rather than posting a public issue.

We will acknowledge your report within 48 hours and provide a timeline for triage and resolution.
