import React, { useState, useEffect } from 'react';
import {
  Settings,
  Key,
  Cpu,
  Shield,
  Save,
  CheckCircle,
  HelpCircle,
  Sliders,
  Type,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { AppSettings, HandwritingFont, PaperStyle } from '../types';
import { api } from '../services/api';

interface SettingsPageProps {
  onSettingsSaved?: (settings: AppSettings) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onSettingsSaved }) => {
  const [settings, setSettings] = useState<AppSettings>({
    openaiApiKey: '',
    selectedModel: 'gpt-4o-mini',
    demoMode: true,
    defaultFont: 'kalam',
    defaultPaper: 'ruled',
    defaultMode: '10-mark',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSettings();
      setSettings(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await api.saveSettings(settings);
      setSettings(updated);
      if (onSettingsSaved) onSettingsSaved(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to save settings:', e);
      alert('Error saving settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
          <Settings className="w-3.5 h-3.5" />
          <span>Application Preferences & AI Config</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Settings & Credentials
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Manage your OpenAI API integration, configure default handwriting fonts, or switch between Live AI and Demo mode.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* OpenAI Configuration Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                OpenAI API Integration
              </h2>
              <p className="text-xs text-slate-500">
                Supply your API key or use the built-in offline demo engine
              </p>
            </div>
          </div>

          {/* Demo Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-amber-700" />
                <span>Offline Demo Mode (Zero API Key Needed)</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed max-w-lg">
                When enabled, the generator synthesizes rich, high-quality exam notes using internal heuristics and sample curriculum models without making external API calls.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input
                type="checkbox"
                checked={settings.demoMode}
                onChange={(e) => setSettings({ ...settings, demoMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                OpenAI API Key
              </label>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                {showKey ? 'Hide Key' : 'Reveal Key'}
              </button>
            </div>
            <input
              type={showKey ? 'text' : 'password'}
              value={settings.openaiApiKey || ''}
              onChange={(e) => setSettings({ ...settings, openaiApiKey: e.target.value })}
              placeholder="sk-proj-..."
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Keys are forwarded directly to backend memory or .env and never committed.</span>
            </p>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              AI Model Selection
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'gpt-4o-mini', name: 'GPT-4o Mini', desc: 'Fast, cost-effective exam synthesis (Recommended)' },
                { id: 'gpt-4o', name: 'GPT-4o', desc: 'Highest reasoning capability for complex proofs & math' },
                { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', desc: 'Standard legacy model for quick summaries' },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSettings({ ...settings, selectedModel: m.id })}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    settings.selectedModel === m.id
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900 mb-1">{m.name}</div>
                  <div className="text-[11px] text-slate-500 leading-normal">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Handwriting Default Preferences */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Default Handwriting & Paper Preferences
              </h2>
              <p className="text-xs text-slate-500">
                Choose the default look when new notes are created
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Default Handwriting Font
              </label>
              <select
                value={settings.defaultFont}
                onChange={(e) =>
                  setSettings({ ...settings, defaultFont: e.target.value as HandwritingFont })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="kalam">Kalam (Neat Indian Student Handwriting)</option>
                <option value="patrick">Patrick Hand (Clean Printed Style)</option>
                <option value="caveat">Caveat (Natural Cursive)</option>
                <option value="indie">Indie Flower (Casual Warmth)</option>
                <option value="architect">Architects Daughter (Crisp Technical)</option>
                <option value="shadows">Shadows Into Light (Fine Gel Ink)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Default Paper Texture
              </label>
              <select
                value={settings.defaultPaper}
                onChange={(e) =>
                  setSettings({ ...settings, defaultPaper: e.target.value as PaperStyle })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="ruled">Ruled Notebook (Blue Lines with Red Margin)</option>
                <option value="grid">Engineering Graph Paper</option>
                <option value="plain">Clean White A4 Paper</option>
                <option value="cornell">Cornell Study Paper</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-2">
          {saveSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Preferences saved successfully!</span>
            </div>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="ml-auto flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
