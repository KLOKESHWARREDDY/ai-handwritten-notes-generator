import React from 'react';
import {
  Sparkles,
  BookOpen,
  FileUp,
  Download,
  Trash2,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
  GraduationCap,
  Globe2,
  FileCheck,
} from 'lucide-react';
import { Note } from '../types';
import { PageId } from '../components/layout/Navbar';

interface DashboardPageProps {
  notes: Note[];
  onNavigate: (page: PageId) => void;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  notes,
  onNavigate,
  onSelectNote,
  onDeleteNote,
}) => {
  const totalNotes = notes.length;
  const examNotesCount = notes.filter(
    (n) => n.mode === '5-mark' || n.mode === '10-mark'
  ).length;
  const teluguNotesCount = notes.filter((n) => n.mode === 'telugu-english').length;
  const diagramNotesCount = notes.filter((n) =>
    n.sections.some((s) => s.type === 'diagram' || s.type === 'table')
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-blue-100 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-yellow-300" />
            <span>Student Exam Preparation Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome to your Handwritten Study Hub
          </h1>
          <p className="text-sm text-blue-100 leading-relaxed">
            Generate handwritten revision sheets, 5-mark and 10-mark answers, and visual comparison tables tailored for your university examination syllabus.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('generator')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-800 font-bold text-xs shadow hover:bg-blue-50 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Generate New Notes</span>
            </button>
            <button
              onClick={() => onNavigate('pdf-upload')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              <FileUp className="w-4 h-4 text-blue-200" />
              <span>Upload PDF Materials</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Notes</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalNotes}</div>
          <div className="text-[11px] text-slate-500 mt-1">Study sheets saved</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Exam Answers</span>
            <FileCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{examNotesCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">5 & 10-mark formats</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Visual Learning</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{diagramNotesCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">With flowcharts & tables</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Telugu-English</span>
            <Globe2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{teluguNotesCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Bilingual explanations</div>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Quick Generation Modes</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('generator')}
            className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-200/80 cursor-pointer hover:border-blue-400 hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Topic to 10-Mark Notes
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter any syllabus topic to generate definitions, Coffman conditions, steps & flowcharts.
            </p>
          </div>

          <div
            onClick={() => onNavigate('pdf-upload')}
            className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/60 border border-purple-200/80 cursor-pointer hover:border-purple-400 hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Extract PDF Study Material
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drop lecture slide decks, syllabus PDFs or textbooks and extract ready study sheets.
            </p>
          </div>

          <div
            onClick={() => onNavigate('editor')}
            className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 border border-emerald-200/80 cursor-pointer hover:border-emerald-400 hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Handwriting Studio
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fine-tune ink colors, handwriting fonts, ruled lines, and export high-res A4 sheets.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Notes Library Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Study Sheets</h2>
            <p className="text-xs text-slate-500">Pick up where you left off or export to PDF</p>
          </div>
          <button
            onClick={() => onNavigate('my-notes')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All ({notes.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            No notes generated yet. Start by generating your first exam note!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.slice(0, 6).map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all bg-slate-50/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {note.mode}
                    </span>
                    <span className="text-[11px] text-slate-600 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-600" />
                      {note.dateStr}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1">
                    {note.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {note.topic} &bull; {note.subject || 'General'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                  <button
                    onClick={() => {
                      onSelectNote(note);
                      onNavigate('editor');
                    }}
                    className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Open in Studio</span>
                    &rarr;
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    title="Delete Note"
                    className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
