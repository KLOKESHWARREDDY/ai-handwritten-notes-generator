export type NoteMode = 
  | 'comprehensive' 
  | '5-mark' 
  | '10-mark' 
  | 'definitions' 
  | 'summary' 
  | 'telugu-english';

export type HandwritingFont = 
  | 'kalam' 
  | 'caveat' 
  | 'patrick' 
  | 'indie' 
  | 'architect' 
  | 'shadows';

export type PaperStyle = 
  | 'ruled' 
  | 'grid' 
  | 'plain' 
  | 'cornell';

export type SectionType = 
  | 'heading'
  | 'paragraph' 
  | 'bullet_points' 
  | 'definition' 
  | 'important_box' 
  | 'diagram' 
  | 'table' 
  | 'telugu_explanation';

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  color?: 'blue' | 'red' | 'green' | 'purple' | 'slate';
}

export interface DiagramLink {
  from: string;
  to: string;
  label?: string;
}

export interface DiagramData {
  type: 'flowchart' | 'mindmap' | 'cycle' | 'hierarchy';
  title: string;
  nodes: DiagramNode[];
  links: DiagramLink[];
}

export interface TableData {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface NoteSection {
  id: string;
  type: SectionType;
  title?: string;
  content?: string;
  items?: string[];
  keywords?: string[];
  diagramData?: DiagramData;
  tableData?: TableData;
  teluguContent?: string;
}

export interface NoteStyleConfig {
  font: HandwritingFont;
  paper: PaperStyle;
  headingColor: string;
  bodyColor: string;
  accentColor: string; // for alerts / red points
  highlightColor: string; // for keywords
  fontSize: 'sm' | 'md' | 'lg';
  lineSpacing: 'normal' | 'relaxed' | 'loose';
  showMargin: boolean;
  showDateBox: boolean;
}

export interface Note {
  id: string;
  title: string;
  topic: string;
  subject?: string;
  mode: NoteMode;
  dateStr: string;
  style: NoteStyleConfig;
  sections: NoteSection[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AIGenerateRequest {
  topic: string;
  subject?: string;
  mode: NoteMode;
  contextText?: string;
  includeDiagram?: boolean;
  languageMode?: 'english' | 'telugu_english';
  model?: string;
}

export interface PDFExtractResponse {
  filename: string;
  pagesCount: number;
  extractedText: string;
  detectedTopics: string[];
  summaryPreview: string;
}

export interface AppSettings {
  openaiApiKey?: string;
  selectedModel: string;
  demoMode: boolean;
  defaultFont: HandwritingFont;
  defaultPaper: PaperStyle;
  defaultMode: NoteMode;
}
