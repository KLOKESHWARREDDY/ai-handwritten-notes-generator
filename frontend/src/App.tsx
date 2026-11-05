import React, { useState, useEffect } from 'react';
import { Navbar, type PageId } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { GeneratorPage } from './pages/GeneratorPage';
import { PdfUploadPage } from './pages/PdfUploadPage';
import { NotesEditorPage } from './pages/NotesEditorPage';
import { MyNotesPage } from './pages/MyNotesPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';
import type { Note, AppSettings } from './types';
import { api, getStoredSettings } from './services/api';
import { SAMPLE_NOTES } from './utils/sampleNotes';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('landing');
  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES);
  const [selectedNote, setSelectedNote] = useState<Note>(SAMPLE_NOTES[0]);
  const [settings, setSettings] = useState<AppSettings>(getStoredSettings());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    return localStorage.getItem('app_theme') === 'dark';
  });

  useEffect(() => {
    loadNotes();
    loadSettings();
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('app_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('app_theme', 'light');
    }
  }, [isDarkTheme]);

  const loadNotes = async () => {
    try {
      const data = await api.getNotes();
      if (data && data.length > 0) {
        setNotes(data);
        setSelectedNote(data[0]);
      }
    } catch (e) {
      console.warn('Could not load notes:', e);
    }
  };

  const loadSettings = async () => {
    try {
      const data = await api.getSettings();
      setSettings(data);
    } catch (e) {
      console.warn('Could not load settings:', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNoteGenerated = (newNote: Note) => {
    setNotes((prev) => [newNote, ...prev.filter((n) => n.id !== newNote.id)]);
    setSelectedNote(newNote);
    showToast('Handwritten study sheet generated!');
  };

  const handleUpdateNote = (updated: Note) => {
    setSelectedNote(updated);
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  const handleSaveNote = (saved: Note) => {
    setNotes((prev) => {
      const idx = prev.findIndex((n) => n.id === saved.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [saved, ...prev];
    });
    showToast('Notes saved to library!');
  };

  const handleDeleteNote = async (id: string) => {
    if (confirm('Are you sure you want to delete this study sheet?')) {
      await api.deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (selectedNote.id === id && notes.length > 1) {
        setSelectedNote(notes.find((n) => n.id !== id) || SAMPLE_NOTES[0]);
      }
      showToast('Note deleted');
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        notesCount={notes.length}
        isDemoMode={settings.demoMode}
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingPage
            onNavigate={setCurrentPage}
            onSelectSampleNote={(sample) => {
              setSelectedNote(sample);
            }}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            notes={notes}
            onNavigate={setCurrentPage}
            onSelectNote={setSelectedNote}
            onDeleteNote={handleDeleteNote}
          />
        )}

        {currentPage === 'generator' && (
          <GeneratorPage
            onNoteGenerated={handleNoteGenerated}
            onNavigate={setCurrentPage}
            isDemoMode={settings.demoMode}
          />
        )}

        {currentPage === 'pdf-upload' && (
          <PdfUploadPage
            onNoteGenerated={handleNoteGenerated}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'editor' && (
          <NotesEditorPage
            note={selectedNote}
            onUpdateNote={handleUpdateNote}
            onSaveNote={handleSaveNote}
          />
        )}

        {currentPage === 'my-notes' && (
          <MyNotesPage
            notes={notes}
            onSelectNote={setSelectedNote}
            onDeleteNote={handleDeleteNote}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'templates' && (
          <TemplatesPage
            onSelectTemplate={(tpl) => {
              setSelectedNote(tpl);
              setNotes((prev) => [tpl, ...prev.filter((n) => n.id !== tpl.id)]);
            }}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'settings' && (
          <SettingsPage
            onSettingsSaved={(newSettings) => {
              setSettings(newSettings);
              showToast('Settings saved');
            }}
          />
        )}

        {currentPage === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
