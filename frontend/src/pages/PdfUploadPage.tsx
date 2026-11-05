import React, { useState, useRef } from 'react';
import {
  FileUp,
  FileText,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Clock,
  Layers,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { api } from '../services/api';
import { PDFExtractResponse, Note, NoteMode } from '../types';
import { PageId } from '../components/layout/Navbar';

interface PdfUploadPageProps {
  onNoteGenerated: (note: Note) => void;
  onNavigate: (page: PageId) => void;
}

export const PdfUploadPage: React.FC<PdfUploadPageProps> = ({
  onNoteGenerated,
  onNavigate,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedData, setExtractedData] = useState<PDFExtractResponse | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<NoteMode>('10-mark');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMsg('Please select a valid PDF file.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('File size exceeds the 15MB limit.');
      return;
    }

    setSelectedFile(file);
    processPdf(file);
  };

  const processPdf = async (file: File) => {
    setIsUploading(true);
    setErrorMsg('');
    try {
      const data = await api.uploadPdf(file);
      setExtractedData(data);
      if (data.detectedTopics && data.detectedTopics.length > 0) {
        setSelectedTopic(data.detectedTopics[0]);
      }
    } catch (err: any) {
      console.error('PDF extraction failed:', err);
      setErrorMsg(err.message || 'Failed to parse PDF document.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateFromPdf = async () => {
    if (!extractedData) return;
    setIsGenerating(true);

    const topicToUse = selectedTopic || extractedData.detectedTopics[0] || extractedData.filename.replace('.pdf', '');

    try {
      const note = await api.generateNotes({
        topic: topicToUse,
        subject: `PDF: ${extractedData.filename}`,
        mode: selectedMode,
        contextText: extractedData.extractedText.slice(0, 3000),
        includeDiagram: true,
      });

      setIsGenerating(false);
      onNoteGenerated(note);
      onNavigate('editor');
    } catch (err) {
      console.error('Generation from PDF failed:', err);
      setIsGenerating(false);
      alert('Failed to synthesize notes from PDF.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          <FileUp className="w-3.5 h-3.5" />
          <span>PyMuPDF Study Material Extractor</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Turn Lecture PDFs into Handwritten Notes
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Upload any lecture presentation, chapter PDF or question bank. We extract the core syllabus topics and compile clean handwritten study sheets.
        </p>
      </div>

      {/* Upload Drag & Drop Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-3xl p-8 sm:p-12 text-center bg-white hover:bg-blue-50/20 transition-all cursor-pointer shadow-sm group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="hidden"
        />

        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-inner">
          <FileUp className="w-8 h-8" />
        </div>

        <h3 className="text-base font-bold text-slate-800 mb-1">
          {selectedFile ? selectedFile.name : 'Click to upload or drag & drop PDF'}
        </h3>
        <p className="text-xs text-slate-500">
          Supports lecture notes, textbook excerpts, and syllabus PDFs (up to 15MB)
        </p>

        {isUploading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-blue-600">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Parsing document pages with PyMuPDF...</span>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Extracted Topics & Generation Config */}
      {extractedData && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {extractedData.filename}
                </h3>
                <p className="text-xs text-slate-500">
                  Extracted {extractedData.pagesCount} pages &bull; {extractedData.extractedText.length.toLocaleString()} characters parsed
                </p>
              </div>
            </div>
          </div>

          {/* Detected Topics */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Select Detected Exam Topic to Synthesize:
            </label>
            <div className="flex flex-wrap gap-2">
              {extractedData.detectedTopics.map((topic, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`text-xs font-semibold px-3 py-2 rounded-xl transition-all ${
                    selectedTopic === topic
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Exam Target Format */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: '10-mark' as NoteMode, label: '10-Mark Detailed Answer' },
              { id: '5-mark' as NoteMode, label: '5-Mark Concise Answer' },
              { id: 'telugu-english' as NoteMode, label: 'Telugu-English Bilingual' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedMode(f.id)}
                className={`p-3 text-xs font-bold rounded-xl border text-center transition-all ${
                  selectedMode === f.id
                    ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-2xs'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Text preview snippet */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Extracted Content Preview:
            </label>
            <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 font-mono max-h-36 overflow-y-auto border border-slate-200 leading-relaxed">
              {extractedData.extractedText.slice(0, 1000)}...
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateFromPdf}
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Synthesizing Handwritten Sheet...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Notes for "{selectedTopic || 'Selected Topic'}"</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
