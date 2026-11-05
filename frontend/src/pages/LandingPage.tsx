import React from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  FileCheck,
  CheckCircle2,
  FileUp,
  Cpu,
  Layers,
  Award,
  Zap,
  Globe2,
} from 'lucide-react';
import { PageId } from '../components/layout/Navbar';
import { HandwrittenPage } from '../components/handwriting/HandwrittenPage';
import { SAMPLE_NOTES } from '../utils/sampleNotes';
import { Note } from '../types';

interface LandingPageProps {
  onNavigate: (page: PageId) => void;
  onSelectSampleNote: (note: Note) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onSelectSampleNote,
}) => {
  const previewNote = SAMPLE_NOTES[0];

  return (
    <div className="space-y-24 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide shadow-2xs">
              <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
              <span>AI-POWERED EDUCATIONAL HANDWRITING PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Turn Text & PDFs into{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Realistic Handwritten Notes
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Ace your semester exams with visually structured, beautifully handwritten study notes.
              Generate 5-mark and 10-mark answers, definitions, flowcharts, comparison tables, and Telugu-English explanations in seconds.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('generator')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-md hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Generate Notes Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('pdf-upload')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer shadow-2xs"
              >
                <FileUp className="w-4 h-4 text-blue-600" />
                <span>Upload PDF Material</span>
              </button>
            </div>

            {/* Quick Demo Prompts */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Quick Exam Demos:</span>
              {SAMPLE_NOTES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    onSelectSampleNote(sample);
                    onNavigate('editor');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-800 text-slate-700 border border-slate-200 transition-colors font-medium"
                >
                  {sample.topic}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Live Handwritten Notebook Preview */}
          <div className="mt-14 relative max-w-4xl mx-auto">
            {/* Ambient decorative gradient */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 via-indigo-100 to-purple-200 rounded-3xl blur-xl opacity-50 -z-10"></div>

            <div className="bg-slate-100/80 p-3 sm:p-6 rounded-2xl border border-slate-300 shadow-xl">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-2 text-xs font-bold text-slate-700">
                    Live Notebook Paper Simulation (A4 Standard)
                  </span>
                </div>
                <button
                  onClick={() => {
                    onSelectSampleNote(previewNote);
                    onNavigate('editor');
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Open in Handwriting Studio &rarr;
                </button>
              </div>

              {/* Scaled preview of the handwritten sheet */}
              <div className="overflow-hidden rounded-xl border border-slate-300 shadow-inner">
                <HandwrittenPage note={previewNote} pageNumber={1} totalPages={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Engineered Specially for University Exams
          </h2>
          <p className="text-sm text-slate-600">
            College evaluators reward clean, structured handwritten notes with clear headings, diagrams, and highlighted keywords.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              5-Mark & 10-Mark Answer Architect
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Auto-structures your notes specifically to hit exam mark criteria: starting with formal definitions, breakdown points, diagrams, and examiner takeaways.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Realistic Handwriting Engine
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Features authentic multi-color inks: Royal Blue headings, Black gel text, Red caution boxes, and Green highlighter keywords on ruled or graph paper.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Telugu + English Bilingual Explanations
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Understand tough technical concepts with native Telugu explanations paired with English technical vocabulary for effortless exam memorization.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Learning Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase font-extrabold text-blue-700 tracking-wider bg-blue-100 px-3 py-1 rounded-full">
                Visual Learning & Mind Maps
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                Hand-Drawn Flowcharts & Comparison Tables
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                The visual learning module converts complex technical dependencies into hand-sketched flowcharts and comparison grids that evaluators love seeing on exam sheets.
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cycle and sequential flowcharts with organic hand-drawn connectors</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Side-by-side comparison tables with hand-ruled border outlines</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Highlighted keywords using realistic green highlighter ink</span>
                </li>
              </ul>
              <div>
                <button
                  onClick={() => onNavigate('generator')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Create Notes with Diagrams
                </button>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-lg">
              <div className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center justify-between">
                <span>Hand-Drawn Comparison Table Sample</span>
                <span className="text-blue-600">Live Rendered</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-hand-kalam text-slate-800 border-2 border-slate-700">
                  <thead className="bg-blue-50/70 border-b-2 border-slate-700 text-blue-900 font-bold">
                    <tr>
                      <th className="p-2 border-r border-slate-400">Parameter</th>
                      <th className="p-2 border-r border-slate-400">TCP Protocol</th>
                      <th className="p-2">UDP Protocol</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-300">
                      <td className="p-2 font-bold border-r border-slate-300">Connection</td>
                      <td className="p-2 border-r border-slate-300">Connection-oriented (3-way handshake)</td>
                      <td className="p-2">Connectionless (Fire & forget)</td>
                    </tr>
                    <tr className="border-b border-slate-300 bg-slate-50/50">
                      <td className="p-2 font-bold border-r border-slate-300">Reliability</td>
                      <td className="p-2 border-r border-slate-300 text-emerald-800 font-bold">Guaranteed delivery & ACK</td>
                      <td className="p-2 text-red-700">No guarantee, best-effort</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold border-r border-slate-300">Use Cases</td>
                      <td className="p-2 border-r border-slate-300">HTTP, SSH, Email (FTP)</td>
                      <td className="p-2">Video streaming, DNS, VoIP</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to generate your first study sheet?
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              No complicated setups. Choose a topic or drop your lecture PDF, select your favorite handwriting font and ink style, and export ready-to-print A4 study sheets.
            </p>
          </div>
          <button
            onClick={() => onNavigate('generator')}
            className="px-6 py-3.5 rounded-xl bg-white text-blue-800 font-extrabold text-sm shadow-md hover:bg-blue-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Launch Notes Generator &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
