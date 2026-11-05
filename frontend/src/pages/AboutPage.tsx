import React from 'react';
import {
  Code,
  Shield,
  Layers,
  Sparkles,
  Heart,
  Terminal,
  BookOpen,
  Award,
  Cpu,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Open-Source Educational Project</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About AI Handwritten Notes Generator
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          An open-source AI platform built to convert complex technical textbooks, syllabus topics, and lecture slide PDFs into aesthetically pleasing, realistic handwritten study notes.
        </p>
      </div>

      {/* Problem Statement & Mission */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          <span>The Problem We Solve</span>
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          College and university semester exams in engineering, sciences, and humanities place enormous weight on structured answers. Evaluators look for formal definitions, step-by-step points, boxed caveats, and clear flowcharts.
        </p>
        <p className="text-xs text-slate-600 leading-relaxed">
          However, students often get overwhelmed reading 500-page textbooks or generic ChatGPT wall-of-text responses. HandwrittenAI bridges this gap by outputting notes designed precisely to look like neat handwritten student exam answer sheets on ruled notebook paper.
        </p>
      </div>

      {/* Technology Architecture */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          <span>System Architecture & Tech Stack</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Code className="w-4 h-4" /> Frontend Studio
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <li>&bull; <strong>React 19 & TypeScript:</strong> Type-safe interactive user interface</li>
              <li>&bull; <strong>Vite:</strong> Ultra-fast modern build tooling</li>
              <li>&bull; <strong>Tailwind CSS:</strong> Custom paper textures and ruling styles</li>
              <li>&bull; <strong>Lucide Icons:</strong> Sleek minimalist icon set</li>
              <li>&bull; <strong>html2canvas & jsPDF:</strong> Instant client-side page rendering</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> Backend Core & AI
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <li>&bull; <strong>Python & FastAPI:</strong> High-performance asynchronous REST API</li>
              <li>&bull; <strong>OpenAI GPT-4o / GPT-4o-mini:</strong> Exam rubric synthesis</li>
              <li>&bull; <strong>PyMuPDF (fitz):</strong> High-throughput PDF text and topic extraction</li>
              <li>&bull; <strong>ReportLab & Pillow:</strong> Server-side publication-quality PDF & image export</li>
              <li>&bull; <strong>SQLite & SQLAlchemy:</strong> Persistent study sheets database</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Architecture */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          <span>Security & Privacy Architecture</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Zero API Key leakage: Credentials are stored server-side via environment variables.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Strict file upload validation: File extensions and 15MB limits are enforced.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Pydantic payload validation: All AI requests and schemas are strictly sanitised.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Privacy-preserving demo mode: Works completely offline without external network calls.</span>
          </div>
        </div>
      </div>

      {/* Open Source License */}
      <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200 text-center space-y-2">
        <p className="text-xs font-bold text-slate-800">
          Released under the MIT License &bull; Free for students, educators & contributors
        </p>
        <p className="text-[11px] text-slate-500">
          Feel free to fork, customize handwriting fonts, add multilingual modules, and submit pull requests on GitHub.
        </p>
      </div>
    </div>
  );
};
