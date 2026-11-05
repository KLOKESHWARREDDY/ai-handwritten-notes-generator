import React, { useState } from 'react';
import {
  Note,
  NoteSection,
  NoteStyleConfig,
  SectionType,
} from '../types';
import { HandwrittenPage } from '../components/handwriting/HandwrittenPage';
import { PaperToolbar } from '../components/handwriting/PaperToolbar';
import { exportPageToPng, exportNoteToPdf } from '../utils/exportHelper';
import { api } from '../services/api';
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layout,
  Layers,
  BookOpen,
} from 'lucide-react';

interface NotesEditorPageProps {
  note: Note;
  onUpdateNote: (note: Note) => void;
  onSaveNote: (note: Note) => void;
}

export const NotesEditorPage: React.FC<NotesEditorPageProps> = ({
  note,
  onUpdateNote,
  onSaveNote,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'sections'>('preview');
  const [isExporting, setIsExporting] = useState(false);
  const [editingSection, setEditingSection] = useState<NoteSection | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleStyleChange = (newStyle: NoteStyleConfig) => {
    onUpdateNote({ ...note, style: newStyle });
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      await exportNoteToPdf(note);
    } catch (e) {
      console.error(e);
      alert('Could not export PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPng = async () => {
    setIsExporting(true);
    try {
      await exportPageToPng(note.title);
    } catch (e) {
      console.error(e);
      alert('Could not export PNG.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.saveNote(note);
      onSaveNote(note);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSection = (type: SectionType) => {
    const newSec: NoteSection = {
      id: 'sec-' + Date.now(),
      type,
      title: type === 'important_box' ? 'Caution / Critical Exam Point' : 'New Concept Point',
      content: 'Enter detailed handwritten study content here. Add keywords for automatic highlight markers.',
      keywords: ['Core Point'],
    };
    if (type === 'bullet_points') {
      newSec.items = ['First essential exam criterion', 'Second practical example or formula'];
    }
    if (type === 'telugu_explanation') {
      newSec.teluguContent = 'ఈ కాన్సెప్ట్ ని సులభంగా అర్థం చేసుకోవడానికి ఇక్కడ వివరణ రాయండి.';
    }

    const updatedSections = [...note.sections, newSec];
    onUpdateNote({ ...note, sections: updatedSections });
    setEditingSection(newSec);
  };

  const handleUpdateSection = (updated: NoteSection) => {
    const updatedSections = note.sections.map((s) => (s.id === updated.id ? updated : s));
    onUpdateNote({ ...note, sections: updatedSections });
    setEditingSection(null);
  };

  const handleDeleteSection = (secId: string) => {
    const updatedSections = note.sections.filter((s) => s.id !== secId);
    onUpdateNote({ ...note, sections: updatedSections });
    if (editingSection?.id === secId) {
      setEditingSection(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Bar with Title & Save */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              {note.mode}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Subject: {note.subject || 'Exam Study Material'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {note.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab(activeTab === 'preview' ? 'sections' : 'preview')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Layers className="w-4 h-4 text-purple-600" />
            <span>{activeTab === 'preview' ? 'Edit Sections' : 'Back to Preview'}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow cursor-pointer ${
              saveSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved to Library!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Notes'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Handwriting Controls Toolbar */}
      <PaperToolbar
        style={note.style}
        onChangeStyle={handleStyleChange}
        onExportPdf={handleExportPdf}
        onExportPng={handleExportPng}
        onPrint={handlePrint}
        isExporting={isExporting}
      />

      {/* Main Studio Workspace: Live Preview vs Section Editor */}
      {activeTab === 'preview' ? (
        <div className="py-4">
          <div className="max-w-4xl mx-auto">
            <HandwrittenPage
              note={note}
              pageNumber={1}
              totalPages={1}
              isEditing={true}
              onEditSection={(sec) => {
                setEditingSection(sec);
                setActiveTab('sections');
              }}
            />
          </div>
        </div>
      ) : (
        /* Section Editor Tab */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sections List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">
                Study Sections ({note.sections.length})
              </h2>
            </div>

            {/* Add Section Buttons */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                + Add Content Element:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                <button
                  onClick={() => handleAddSection('definition')}
                  className="p-2 text-left rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-800"
                >
                  + Definition Box
                </button>
                <button
                  onClick={() => handleAddSection('bullet_points')}
                  className="p-2 text-left rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-800"
                >
                  + Key Points List
                </button>
                <button
                  onClick={() => handleAddSection('important_box')}
                  className="p-2 text-left rounded-lg border border-red-200 hover:border-red-400 hover:bg-red-50 text-red-900"
                >
                  + Caution / Tip Box
                </button>
                <button
                  onClick={() => handleAddSection('telugu_explanation')}
                  className="p-2 text-left rounded-lg border border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-purple-900"
                >
                  + Telugu Explain
                </button>
              </div>
            </div>

            {/* List of sections */}
            <div className="space-y-2">
              {note.sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  onClick={() => setEditingSection(sec)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    editingSection?.id === sec.id
                      ? 'border-blue-600 bg-blue-50/70 shadow-2xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">
                      {idx + 1}. {sec.title || sec.type}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 uppercase font-semibold">
                      {sec.type}
                    </span>
                  </div>
                  <p className="text-slate-500 line-clamp-1">
                    {sec.content || (sec.items && sec.items.join(', ')) || 'Visual element'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Section Form */}
          <div className="lg:col-span-2">
            {editingSection ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Edit2 className="w-4 h-4 text-blue-600" />
                    <span>Edit Section: {editingSection.title}</span>
                  </h3>
                  <button
                    onClick={() => handleDeleteSection(editingSection.id)}
                    className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Section Title</label>
                  <input
                    type="text"
                    value={editingSection.title || ''}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, title: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Content / Paragraph</label>
                  <textarea
                    rows={4}
                    value={editingSection.content || ''}
                    onChange={(e) =>
                      setEditingSection({ ...editingSection, content: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                  />
                </div>

                {editingSection.type === 'bullet_points' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Bullet Points</label>
                    {(editingSection.items || []).map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newItems = [...(editingSection.items || [])];
                            newItems[i] = e.target.value;
                            setEditingSection({ ...editingSection, items: newItems });
                          }}
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = editingSection.items?.filter((_, idx) => idx !== i);
                            setEditingSection({ ...editingSection, items: newItems });
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = [...(editingSection.items || []), 'New key point'];
                        setEditingSection({ ...editingSection, items: newItems });
                      }}
                      className="text-xs text-blue-600 font-bold hover:underline"
                    >
                      + Add Point
                    </button>
                  </div>
                )}

                {editingSection.type === 'telugu_explanation' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-purple-700">Telugu Explanation Text</label>
                    <textarea
                      rows={3}
                      value={editingSection.teluguContent || ''}
                      onChange={(e) =>
                        setEditingSection({ ...editingSection, teluguContent: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed font-sans"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Highlighted Keywords (Comma-separated for green marker)
                  </label>
                  <input
                    type="text"
                    value={(editingSection.keywords || []).join(', ')}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean),
                      })
                    }
                    placeholder="e.g., Deadlock, Circular Wait, Banker's Algorithm"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => handleUpdateSection(editingSection)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Apply Section Updates
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center text-xs text-slate-500">
                Select any section from the left column to edit its wording, points, and highlighted keywords.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
