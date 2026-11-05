import React from 'react';
import { NoteStyleConfig, HandwritingFont, PaperStyle } from '../../types';
import {
  Type,
  FileText,
  Printer,
  Download,
  Image,
  Palette,
  Maximize2,
  Check,
  Sparkles,
} from 'lucide-react';

interface PaperToolbarProps {
  style: NoteStyleConfig;
  onChangeStyle: (newStyle: NoteStyleConfig) => void;
  onExportPdf: () => void;
  onExportPng: () => void;
  onPrint: () => void;
  isExporting?: boolean;
}

const FONTS: { id: HandwritingFont; label: string; sample: string }[] = [
  { id: 'kalam', label: 'Kalam (Neat Student)', sample: 'Student handwriting' },
  { id: 'patrick', label: 'Patrick Hand (Clean Print)', sample: 'Clean print style' },
  { id: 'caveat', label: 'Caveat (Fluid Cursive)', sample: 'Cursive notes' },
  { id: 'indie', label: 'Indie Flower (Casual)', sample: 'Casual study' },
  { id: 'architect', label: 'Architects (Sharp)', sample: 'Sharp technical' },
  { id: 'shadows', label: 'Shadows (Fine Tip)', sample: 'Fine gel pen' },
];

const PAPERS: { id: PaperStyle; label: string }[] = [
  { id: 'ruled', label: 'Ruled Notebook (Blue/Red Line)' },
  { id: 'grid', label: 'Engineering Graph / Grid' },
  { id: 'plain', label: 'Ivory A4 Sheet' },
  { id: 'cornell', label: 'Cornell Exam Format' },
];

const HEADING_COLORS = [
  { label: 'Royal Blue', value: '#1e40af' },
  { label: 'Navy Blue', value: '#1e3a8a' },
  { label: 'Dark Purple', value: '#6b21a8' },
  { label: 'Teal Green', value: '#0f766e' },
  { label: 'Classic Black', value: '#18181b' },
];

export const PaperToolbar: React.FC<PaperToolbarProps> = ({
  style,
  onChangeStyle,
  onExportPdf,
  onExportPng,
  onPrint,
  isExporting = false,
}) => {
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-3 mb-6 sticky top-20 z-20 transition-all backdrop-blur-md bg-white/95">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Handwriting Font Selection */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
            <Type className="w-3.5 h-3.5 text-blue-600" /> Font:
          </span>
          <select
            value={style.font}
            onChange={(e) =>
              onChangeStyle({ ...style, font: e.target.value as HandwritingFont })
            }
            aria-label="Handwriting Font"
            className="text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-100 transition-colors"
          >
            {FONTS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Paper Style Selection */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-purple-600" /> Paper:
          </span>
          <select
            value={style.paper}
            onChange={(e) =>
              onChangeStyle({ ...style, paper: e.target.value as PaperStyle })
            }
            aria-label="Paper Style"
            className="text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-slate-100 transition-colors"
          >
            {PAPERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Heading Ink Color */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1 mr-1">
            <Palette className="w-3.5 h-3.5 text-blue-600" /> Ink:
          </span>
          {HEADING_COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => onChangeStyle({ ...style, headingColor: c.value })}
              title={c.label}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                style.headingColor === c.value
                  ? 'border-blue-600 scale-110 shadow-sm'
                  : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>

        {/* Font Size Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          {(['sm', 'md', 'lg'] as const).map((sz) => (
            <button
              key={sz}
              onClick={() => onChangeStyle({ ...style, fontSize: sz })}
              className={`px-2 py-0.5 text-xs font-bold rounded capitalize ${
                style.fontSize === sz
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* Line Spacing */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          {(['normal', 'relaxed', 'loose'] as const).map((sp) => (
            <button
              key={sp}
              onClick={() => onChangeStyle({ ...style, lineSpacing: sp })}
              className={`px-2 py-0.5 text-xs font-medium rounded capitalize ${
                style.lineSpacing === sp
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>

        {/* Export and Print Action Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onPrint}
            title="Print Notes directly"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            onClick={onExportPng}
            disabled={isExporting}
            title="Export Page as PNG Image"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-2xs disabled:opacity-50"
          >
            <Image className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">PNG</span>
          </button>

          <button
            onClick={onExportPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs hover:shadow-md disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
