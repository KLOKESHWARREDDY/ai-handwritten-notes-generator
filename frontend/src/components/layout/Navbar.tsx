import React from 'react';
import {
  PenTool,
  Sparkles,
  FileUp,
  Edit3,
  BookOpen,
  Settings,
  Info,
  LayoutDashboard,
  PlusCircle,
  Cpu,
} from 'lucide-react';

export type PageId =
  | 'landing'
  | 'dashboard'
  | 'generator'
  | 'pdf-upload'
  | 'editor'
  | 'my-notes'
  | 'settings'
  | 'about';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  notesCount: number;
  isDemoMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  notesCount,
  isDemoMode = true,
}) => {
  const navItems: { id: PageId; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'generator', label: 'AI Generator', icon: <Sparkles className="w-4 h-4 text-purple-600" /> },
    { id: 'pdf-upload', label: 'PDF to Notes', icon: <FileUp className="w-4 h-4 text-blue-600" /> },
    { id: 'editor', label: 'Handwriting Studio', icon: <Edit3 className="w-4 h-4 text-emerald-600" /> },
    { id: 'my-notes', label: 'My Notes', icon: <BookOpen className="w-4 h-4" />, badge: notesCount },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <PenTool className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base md:text-lg bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  HandwrittenAI
                </span>
                {isDemoMode && (
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> Demo
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block -mt-0.5 font-medium">
                AI Exam Notes & Handwriting Engine
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-blue-50 text-blue-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('generator')}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:shadow-indigo-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Create Notes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden border-t border-slate-200 bg-slate-50/90 px-2 py-1.5 flex items-center justify-around overflow-x-auto">
        {navItems.map((item) => {
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors shrink-0 ${
                active ? 'text-blue-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.icon}
              <span className="mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
