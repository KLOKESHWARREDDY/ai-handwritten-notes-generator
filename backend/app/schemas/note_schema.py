from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field
from datetime import datetime


class DiagramNode(BaseModel):
    id: str
    label: str
    sublabel: Optional[str] = None
    color: Optional[str] = "blue"


class DiagramLink(BaseModel):
    from_node: str = Field(alias="from")
    to_node: str = Field(alias="to")
    label: Optional[str] = None

    model_config = {"populate_by_name": True}


class DiagramData(BaseModel):
    type: str = "flowchart"  # flowchart, cycle, mindmap, hierarchy
    title: str
    nodes: List[DiagramNode] = []
    links: List[DiagramLink] = []


class TableData(BaseModel):
    title: str
    headers: List[str]
    rows: List[List[str]]


class NoteSection(BaseModel):
    id: str
    type: str  # definition, bullet_points, important_box, diagram, table, telugu_explanation, paragraph
    title: Optional[str] = None
    content: Optional[str] = None
    items: Optional[List[str]] = None
    keywords: Optional[List[str]] = None
    diagramData: Optional[DiagramData] = None
    tableData: Optional[TableData] = None
    teluguContent: Optional[str] = None


class NoteStyleConfig(BaseModel):
    font: str = "kalam"
    paper: str = "ruled"
    headingColor: str = "#1e40af"
    bodyColor: str = "#18181b"
    accentColor: str = "#dc2626"
    highlightColor: str = "#15803d"
    fontSize: str = "md"
    lineSpacing: str = "normal"
    showMargin: bool = True
    showDateBox: bool = True


class NoteBase(BaseModel):
    id: str
    title: str
    topic: str
    subject: Optional[str] = None
    mode: str = "10-mark"
    dateStr: Optional[str] = None
    style: NoteStyleConfig
    sections: List[NoteSection]
    tags: Optional[List[str]] = []


class NoteCreate(NoteBase):
    pass


class NoteResponse(NoteBase):
    createdAt: Optional[str] = None
    updatedAt: Optional[str] = None

    model_config = {"from_attributes": True}


class AppSettingsSchema(BaseModel):
    openaiApiKey: Optional[str] = ""
    selectedModel: str = "gpt-4o-mini"
    demoMode: bool = True
    defaultFont: str = "kalam"
    defaultPaper: str = "ruled"
    defaultMode: str = "10-mark"
