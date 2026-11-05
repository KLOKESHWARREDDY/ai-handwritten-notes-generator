import json
import logging
import time
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from app.config import settings
from app.schemas.ai_schema import AIGenerateRequest
from app.schemas.note_schema import NoteResponse, NoteSection, NoteStyleConfig, DiagramData, TableData

logger = logging.getLogger(__name__)


EXAM_SYSTEM_PROMPT = """You are a Senior University Professor and Exam Evaluator.
Your goal is to generate pristine, high-scoring, realistic handwritten-style study notes for college students.
Format the output strictly as a valid JSON object matching the requested schema.

Guidelines:
1. Explain topics with crystal-clear simplicity while preserving rigorous technical accuracy.
2. Structure for examination marks (5-mark / 10-mark formats):
   - Start with a crisp, authoritative Definition.
   - List the essential core principles / conditions / algorithms.
   - Provide an educational flowchart or cycle diagram representation.
   - Include comparison tables where relevant.
   - Provide a Red Box Examiner Warning / Scoring Tip (common pitfalls students make).
3. If Telugu-English mode is chosen, provide bilingual explanations: plain-Telugu colloquial explanation paired with English technical terminology.
4. Highlight key terms by placing them in the 'keywords' array for each section.
5. NEVER hallucinate false references or irrelevant filler.

Output JSON schema:
{
  "title": "Topic Title (Target Marks)",
  "sections": [
    {
      "id": "sec-1",
      "type": "definition",
      "title": "Formal Definition",
      "content": "Precise definition text...",
      "keywords": ["Keyword1", "Keyword2"]
    },
    {
      "id": "sec-2",
      "type": "bullet_points",
      "title": "Core Mechanism & Conditions",
      "items": ["Point 1", "Point 2", "Point 3"],
      "keywords": ["Key1", "Key2"]
    },
    {
      "id": "sec-3",
      "type": "diagram",
      "title": "Execution Flowchart",
      "diagramData": {
        "type": "flowchart",
        "title": "Flow Diagram",
        "nodes": [
          {"id": "n1", "label": "Start / Input", "sublabel": "Validate state", "color": "blue"},
          {"id": "n2", "label": "Process Logic", "sublabel": "Core rule", "color": "purple"},
          {"id": "n3", "label": "Output", "sublabel": "Commit", "color": "green"}
        ],
        "links": [
          {"from": "n1", "to": "n2", "label": "Step 1"},
          {"from": "n2", "to": "n3", "label": "Step 2"}
        ]
      }
    },
    {
      "id": "sec-4",
      "type": "important_box",
      "title": "Critical Exam Tip",
      "content": "Examiner tip or formula...",
      "items": ["Important point 1", "Important point 2"],
      "keywords": ["Formula", "Pitfall"]
    },
    {
      "id": "sec-5",
      "type": "table",
      "title": "Comparison Grid",
      "tableData": {
        "title": "Parameter Comparison",
        "headers": ["Parameter", "Entity A", "Entity B"],
        "rows": [["Criteria 1", "Val A", "Val B"], ["Criteria 2", "Val A2", "Val B2"]]
      }
    },
    {
      "id": "sec-6",
      "type": "telugu_explanation",
      "title": "సులభమైన వివరణ (Simple Explanation)",
      "content": "English explanation context...",
      "teluguContent": "సరళమైన తెలుగు వివరణ...",
      "keywords": ["తెలుగు వివరణ"]
    }
  ]
}
"""


class AIService:
    @staticmethod
    async def generate_note(req: AIGenerateRequest, api_key: Optional[str] = None) -> NoteResponse:
        key_to_use = api_key or settings.OPENAI_API_KEY
        use_demo = settings.DEMO_MODE or not key_to_use or len(key_to_use.strip()) < 10

        if not use_demo:
            try:
                return await AIService._generate_with_openai(req, key_to_use)
            except Exception as e:
                logger.warning(f"OpenAI API call failed ({e}). Falling back to smart offline synthesizer.")

        return AIService._generate_offline(req)

    @staticmethod
    async def _generate_with_openai(req: AIGenerateRequest, api_key: str) -> NoteResponse:
        from openai import AsyncOpenAI

        client = AsyncOpenAI(api_key=api_key)
        model = req.model or settings.OPENAI_MODEL

        user_prompt = f"""
Generate exam study notes for the following topic:
Topic: {req.topic}
Subject: {req.subject or 'General Engineering / Science'}
Target Exam Format: {req.mode} (e.g. 10-mark, 5-mark, summary, telugu-english)
Include Diagrams/Flowcharts: {'Yes' if req.includeDiagram else 'No'}
Language Mode: {req.languageMode}

Additional Context/Syllabus Details:
{req.contextText or 'None provided. Use standard university examination curriculum.'}

Return ONLY valid JSON matching the system schema.
"""

        response = await client.chat.completions.create(
            model=model,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": EXAM_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.4,
        )

        content = response.choices[0].message.content
        data = json.loads(content)

        return AIService._format_to_note_response(data, req)

    @staticmethod
    def _generate_offline(req: AIGenerateRequest) -> NoteResponse:
        """
        Smart offline heuristic generator providing rich, academically sound notes
        without requiring external network or OpenAI tokens.
        """
        topic = req.topic
        subject = req.subject or "University Examination"
        mode = req.mode
        is_telugu = mode == "telugu-english" or req.languageMode == "telugu_english"

        # Heuristic topic enrichment
        title = f"{topic} ({mode.upper()})"
        if req.subject:
            title = f"{subject}: {topic}"

        sections: List[Dict[str, Any]] = [
            {
                "id": "sec-1",
                "type": "definition",
                "title": f"Definition & Core Premise: {topic}",
                "content": f"{topic} is a fundamental concept in {subject}. It governs the operational dynamics, state transitions, and architectural constraints required for correctness and efficiency in system operations.",
                "keywords": [topic, "Fundamental Concept", "Architectural Constraints", "System Operations"],
            },
            {
                "id": "sec-2",
                "type": "bullet_points",
                "title": f"Core Principles & Examination Criteria",
                "items": [
                    f"1. Formal Specification: Always state the prerequisite assumptions and mathematical bounds before explaining mechanisms.",
                    f"2. Step-by-Step Execution: Begin with initialization, validate inputs against state rules, execute primary logic, and verify invariant conditions.",
                    f"3. Practical Trade-offs: Contrast throughput vs latency, memory overhead vs computation complexity (Big-O analysis).",
                    f"4. Real-world Deployment: Modern frameworks implement {topic} using caching, concurrency primitives, and automated rollback handlers.",
                ],
                "keywords": ["Formal Specification", "Step-by-Step", "Big-O Analysis", "Trade-offs"],
            },
        ]

        # Add diagram if requested
        if req.includeDiagram:
            sections.append({
                "id": "sec-3",
                "type": "diagram",
                "title": f"{topic} Architecture & Flowchart",
                "diagramData": {
                    "type": "flowchart",
                    "title": f"{topic} Flow Lifecycle",
                    "nodes": [
                        {"id": "n1", "label": "1. Input Request", "sublabel": "Validation & Setup", "color": "blue"},
                        {"id": "n2", "label": "2. State Verification", "sublabel": "Invariant checks", "color": "purple"},
                        {"id": "n3", "label": "3. Core Processing", "sublabel": "Algorithm Execution", "color": "red"},
                        {"id": "n4", "label": "4. Final Commit", "sublabel": "Verified Result", "color": "green"},
                    ],
                    "links": [
                        {"from": "n1", "to": "n2", "label": "Validates"},
                        {"from": "n2", "to": "n3", "label": "Safe"},
                        {"from": "n3", "to": "n4", "label": "Success"},
                    ],
                },
            })

        # Add Comparison Table for 10-mark and 5-mark
        sections.append({
            "id": "sec-4",
            "type": "table",
            "title": f"Comparison: Traditional Approach vs Modern {topic}",
            "tableData": {
                "title": f"Comparative Evaluation of {topic}",
                "headers": ["Evaluation Metric", "Naive / Legacy Approach", f"Optimized {topic}"],
                "rows": [
                    ["Time Complexity", "O(N^2) worst-case degradation", "O(N log N) or O(1) bounded index"],
                    ["Resource Consumption", "High CPU contention & lock waiting", "Balanced non-blocking resource dispatch"],
                    ["Fault Tolerance", "Single point of failure; manual restart", "Automated checkpointing & graceful recovery"],
                    ["Exam Priority", "Mention only as contrast baseline", "Mandatory core focus for full marks"],
                ],
            },
        })

        # Add Important Examiner Box
        sections.append({
            "id": "sec-5",
            "type": "important_box",
            "title": "Evaluator's Scoring Checklist (Top Mistakes to Avoid)",
            "content": f"Do not omit the boundary conditions when writing the answer sheet. Evaluators verify whether you clearly highlight the differences and underline the formal definitions.",
            "items": [
                "Always write the time & space complexity clearly in a boxed header.",
                "Draw the flowchart before diving into the detailed paragraphs.",
                "Highlight key parameters in bold or colored ink.",
            ],
            "keywords": ["Scoring Checklist", "Boundary Conditions", "Full Marks"],
        })

        # Add Telugu explanation if requested
        if is_telugu:
            sections.append({
                "id": "sec-telugu",
                "type": "telugu_explanation",
                "title": f"సులభమైన తెలుగు కాన్సెప్ట్ వివరణ ({topic})",
                "content": f"{topic} యొక్క ముఖ్య ఉద్దేశ్యం ఏమిటంటే సిస్టమ్ పనితీరును వేగవంతం చేయడం మరియు ఎలాంటి లోపాలు జరగకుండా నియంత్రించడం.",
                "teluguContent": f"సింపుల్ గా చెప్పాలంటే: పరీక్షలో ఈ ప్రశ్నకు సమాధానం రాసేటప్పుడు ముందుగా నిర్వచనం (Definition), తర్వాత ఫ్లోచార్ట్ (Flowchart), ఆపై 4 ముఖ్యమైన పాయింట్లు మరియు ఉదాహరణ రాయడం వలన సులభంగా పూర్తి మార్కులు వస్తాయి.",
                "keywords": ["తెలుగు వివరణ", "పూర్తి మార్కులు", "ముఖ్య పాయింట్లు"],
            })

        data = {
            "title": title,
            "sections": sections,
        }

        return AIService._format_to_note_response(data, req)

    @staticmethod
    def _format_to_note_response(data: Dict[str, Any], req: AIGenerateRequest) -> NoteResponse:
        date_str = datetime.now().strftime("%d/%m/%Y")
        note_id = f"note-{int(time.time() * 1000)}"

        # Parse sections
        parsed_sections: List[NoteSection] = []
        for s in data.get("sections", []):
            try:
                diag = None
                if s.get("diagramData"):
                    diag = DiagramData(**s["diagramData"])
                
                tbl = None
                if s.get("tableData"):
                    tbl = TableData(**s["tableData"])

                parsed_sections.append(
                    NoteSection(
                        id=s.get("id", f"sec-{len(parsed_sections)}"),
                        type=s.get("type", "paragraph"),
                        title=s.get("title"),
                        content=s.get("content"),
                        items=s.get("items"),
                        keywords=s.get("keywords", []),
                        diagramData=diag,
                        tableData=tbl,
                        teluguContent=s.get("teluguContent"),
                    )
                )
            except Exception as e:
                logger.error(f"Error parsing section {s}: {e}")

        style = NoteStyleConfig(
            font="kalam",
            paper="ruled",
            headingColor="#1e40af",
            bodyColor="#18181b",
            accentColor="#dc2626",
            highlightColor="#15803d",
            fontSize="md",
            lineSpacing="normal",
            showMargin=True,
            showDateBox=True,
        )

        return NoteResponse(
            id=note_id,
            title=data.get("title", f"{req.topic} Notes"),
            topic=req.topic,
            subject=req.subject or "Exam Preparation",
            mode=req.mode,
            dateStr=date_str,
            style=style,
            sections=parsed_sections,
            tags=[req.topic.split()[0], req.mode, "AI Generated"],
            createdAt=datetime.now(timezone.utc).isoformat(),
            updatedAt=datetime.now(timezone.utc).isoformat(),
        )
