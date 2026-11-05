import React from 'react';
import { PenTool, Heart, Shield, Code, BookOpen, Sparkles } from 'lucide-react';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <PenTool className="w-4 h-4 -rotate-45" />
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight">
                HandwrittenAI
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Transforming textbooks, syllabus topics, and lecture PDFs into authentic handwritten study notes for university examinations.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-medium w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open-Source MIT Licensed
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Features
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => onNavigate('generator')}
                  className="hover:text-blue-600 transition-colors"
                >
                  5-Mark & 10-Mark Notes Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pdf-upload')}
                  className="hover:text-blue-600 transition-colors"
                >
                  PDF Study Material Extraction
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('editor')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Realistic Handwriting Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('generator')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Telugu-English Bilingual Notes
                </button>
              </li>
            </ul>
          </div>

          {/* Ink & Handwriting Engine */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Engine Specs
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>&bull; Blue & Black ink dual ballpoint simulation</li>
              <li>&bull; Red ink caution boxes & examiners' tips</li>
              <li>&bull; Green keyword highlighters</li>
              <li>&bull; Hand-drawn flowcharts & rough diagrams</li>
              <li>&bull; Ruled notebook, graph grid & Cornell paper</li>
            </ul>
          </div>

          {/* Open Source & About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Project & Resources
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Architecture & Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('settings')}
                  className="hover:text-blue-600 transition-colors"
                >
                  OpenAI API & Model Configuration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('my-notes')}
                  className="hover:text-blue-600 transition-colors"
                >
                  My Saved Notes Library
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            &copy; {new Date().getFullYear()} AI Handwritten Notes Generator &bull; Designed for college students & educators worldwide.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-600">
              Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for Exam Success
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
