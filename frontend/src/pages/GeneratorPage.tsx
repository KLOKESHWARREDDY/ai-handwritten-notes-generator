import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Award,
  Layers,
  Globe2,
  FileText,
  ChevronRight,
  Lightbulb,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { NoteMode, Note } from '../types';
import { api } from '../services/api';
import { PageId } from '../components/layout/Navbar';

interface GeneratorPageProps {
  onNoteGenerated: (note: Note) => void;
  onNavigate: (page: PageId) => void;
  isDemoMode?: boolean;
}

const PRESET_TOPICS = [
  { topic: 'Process Synchronization & Semaphores', subject: 'Operating Systems', mode: '10-mark' as NoteMode },
  { topic: 'ACID Properties in Relational Databases', subject: 'DBMS', mode: '5-mark' as NoteMode },
  { topic: 'OSI 7-Layer Reference Model', subject: 'Computer Networks', mode: '10-mark' as NoteMode },
  { topic: 'Supervised vs Unsupervised ML', subject: 'Machine Learning', mode: 'telugu-english' as NoteMode },
  { topic: 'Object-Oriented Programming (OOP) 4 Pillars', subject: 'Java / C++', mode: '5-mark' as NoteMode },
  { topic: 'Binary Search Tree & Balancing Algorithms', subject: 'Data Structures', mode: '10-mark' as NoteMode },
];

export const GeneratorPage: React.FC<GeneratorPageProps> = ({
  onNoteGenerated,
  onNavigate,
  isDemoMode = true,
}) => {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [mode, setMode] = useState<NoteMode>('10-mark');
  const [includeDiagram, setIncludeDiagram] = useState(true);
  const [languageMode, setLanguageMode] = useState<'english' | 'telugu_english'>('english');
  const [additionalContext, setAdditionalContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGenerationStep('Analyzing syllabus topic & exam rubric...');

    try {
      setTimeout(() => {
        setGenerationStep('Synthesizing definitions, key principles & diagrams...');
      }, 700);

      const generatedNote = await api.generateNotes({
        topic: topic.trim(),
        subject: subject.trim() || undefined,
        mode,
        includeDiagram,
        languageMode: mode === 'telugu-english' ? 'telugu_english' : languageMode,
        contextText: additionalContext.trim() || undefined,
      });

      setGenerationStep('Applying realistic handwriting ink & ruling...');
      setTimeout(() => {
        setIsGenerating(false);
        onNoteGenerated(generatedNote);
        onNavigate('editor');
      }, 500);
    } catch (err) {
      console.error('Generation failed:', err);
      setIsGenerating(false);
      alert('Note generation encountered an issue. Falling back to offline mode.');
    }
  };

  const handleSelectPreset = (p: typeof PRESET_TOPICS[0]) => {
    setTopic(p.topic);
    setSubject(p.subject);
    setMode(p.mode);
    if (p.mode === 'telugu-english') {
      setLanguageMode('telugu_english');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Title & Description */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Exam Note Synthesizer</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Generate Handwritten Exam Notes
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Enter any university course topic. The AI organizes answers with formal definitions, bullet points, hand-drawn flowcharts, and examiner tips.
        </p>
      </div>

      {/* Preset Topics Bar */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>Popular Exam Topics (Click to quick-load):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_TOPICS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className="text-xs font-medium px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-800 transition-all text-slate-700 shadow-2xs"
            >
              {p.topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form
        onSubmit={handleGenerate}
        className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6"
      >
        {/* Topic Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Educational Topic / Question Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Bankers Algorithm & Safety Criteria, OSI Model, Normalization in DBMS..."
            className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
          />
        </div>

        {/* Subject / Course */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Course / Subject Name (Optional)
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Operating Systems (CS302)"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Language Style
            </label>
            <select
              value={languageMode}
              onChange={(e) => setLanguageMode(e.target.value as any)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="english">Standard English (Academic / Exam)</option>
              <option value="telugu_english">Bilingual (Telugu + English Explanations)</option>
            </select>
          </div>
        </div>

        {/* Exam Format / Note Mode Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Target Exam Format
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: '10-mark' as NoteMode,
                title: '10-Mark Detailed Answer',
                desc: 'Definitions, Coffman conditions, steps, flowcharts & tips.',
                icon: <Award className="w-4 h-4 text-purple-600" />,
              },
              {
                id: '5-mark' as NoteMode,
                title: '5-Mark Concise Answer',
                desc: 'Precise definitions, 4-5 bullet points, comparison table.',
                icon: <CheckCircle2 className="w-4 h-4 text-blue-600" />,
              },
              {
                id: 'telugu-english' as NoteMode,
                title: 'Telugu + English Bilingual',
                desc: 'Dual script: Telugu concept analogies + English technical terms.',
                icon: <Globe2 className="w-4 h-4 text-emerald-600" />,
              },
              {
                id: 'summary' as NoteMode,
                title: 'Quick Revision Summary',
                desc: 'Bullet-point cheat sheet for night-before revision.',
                icon: <Layers className="w-4 h-4 text-amber-600" />,
              },
              {
                id: 'definitions' as NoteMode,
                title: 'Definitions & Formulas',
                desc: 'Pure definitions, mathematical equations & glossary.',
                icon: <BookOpen className="w-4 h-4 text-indigo-600" />,
              },
              {
                id: 'comprehensive' as NoteMode,
                title: 'Full Chapter Notes',
                desc: 'In-depth textbook breakdown with all sub-topics.',
                icon: <FileText className="w-4 h-4 text-slate-600" />,
              },
            ].map((fmt) => (
              <div
                key={fmt.id}
                onClick={() => {
                  setMode(fmt.id);
                  if (fmt.id === 'telugu-english') setLanguageMode('telugu_english');
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  mode === fmt.id
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-2xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {fmt.icon}
                  <span className="text-xs font-bold text-slate-900">{fmt.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">{fmt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Learning Options */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div>
            <div className="text-xs font-bold text-slate-800">Visual Learning Engine</div>
            <div className="text-[11px] text-slate-500">
              Generate hand-drawn flowcharts, comparison tables, and keyword highlighters
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={includeDiagram}
              onChange={(e) => setIncludeDiagram(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Additional Syllabus context */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Specific Syllabus Details / Text to Include (Optional)
          </label>
          <textarea
            rows={3}
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            placeholder="Paste syllabus bullet points, specific algorithm requirements, or textbook paragraphs here..."
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating || !topic.trim()}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-md hover:shadow-indigo-500/25 hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{generationStep || 'Synthesizing Notes...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Handwritten Study Notes</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
