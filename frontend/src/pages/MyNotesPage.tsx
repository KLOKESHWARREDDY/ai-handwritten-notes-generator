import React, { useState } from 'react';
import { Note, NoteMode } from '../types';
import {
  BookOpen,
  Search,
  Filter,
  Trash2,
  Download,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  PlusCircle,
} from 'lucide-react';
import { exportNoteToPdf } from '../utils/exportHelper';
import { PageId } from '../components/layout/Navbar';

interface MyNotesPageProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onNavigate: (page: PageId) => void;
}

export const MyNotesPage: React.FC<MyNotesPageProps> = ({
  notes,
  onSelectNote,
  onDeleteNote,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.subject && n.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (n.tags && n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!matchesSearch) return false;
    if (selectedFilter === 'all') return true;
    return n.mode === selectedFilter;
  });

  const handleQuickDownload = async (note: Note) => {
    try {
      await exportNoteToPdf(note);
    } catch (e) {
      console.error(e);
      alert('Could not download PDF.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Handwritten Notes Library
          </h1>
          <p className="text-xs text-slate-500">
            {notes.length} study sheet{notes.length === 1 ? '' : 's'} saved across all semester courses
          </p>
        </div>

        <button
          onClick={() => onNavigate('generator')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Exam Note</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, subject or tag..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Notes' },
            { id: '10-mark', label: '10-Mark' },
            { id: '5-mark', label: '5-Mark' },
            { id: 'telugu-english', label: 'Telugu-English' },
            { id: 'summary', label: 'Summary' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedFilter === f.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-700">No notes found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery
                ? `No notes match "${searchQuery}". Try a different keyword.`
                : 'You have not saved any notes in this category yet.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('generator')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl"
          >
            Generate New Notes Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => {
            const hasDiagram = note.sections.some((s) => s.type === 'diagram');
            const hasTable = note.sections.some((s) => s.type === 'table');
            const hasTelugu = note.sections.some((s) => s.type === 'telugu_explanation');

            return (
              <div
                key={note.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      {note.mode}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3" />
                      {note.dateStr}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1.5">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-1">
                    Subject: {note.subject || 'General Engineering'}
                  </p>

                  {/* Badges for visual elements */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {hasDiagram && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                        Flowchart
                      </span>
                    )}
                    {hasTable && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        Table
                      </span>
                    )}
                    {hasTelugu && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Telugu Explanations
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      onSelectNote(note);
                      onNavigate('editor');
                    }}
                    className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open in Studio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleQuickDownload(note)}
                      title="Download PDF"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      title="Delete Note"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
