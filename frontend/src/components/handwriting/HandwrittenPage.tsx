import React from 'react';
import { Note, NoteSection } from '../../types';
import { KeywordHighlight } from './KeywordHighlight';
import { HandDrawnDiagram } from './HandDrawnDiagram';
import { HandDrawnTable } from './HandDrawnTable';

interface HandwrittenPageProps {
  note: Note;
  pageNumber?: number;
  totalPages?: number;
  onEditSection?: (section: NoteSection) => void;
  isEditing?: boolean;
}

export const HandwrittenPage: React.FC<HandwrittenPageProps> = ({
  note,
  pageNumber = 1,
  totalPages = 1,
  onEditSection,
  isEditing = false,
}) => {
  const { style } = note;

  const getFontFamilyClass = () => {
    switch (style.font) {
      case 'caveat':
        return 'font-hand-caveat';
      case 'patrick':
        return 'font-hand-patrick';
      case 'indie':
        return 'font-hand-indie';
      case 'architect':
        return 'font-hand-architect';
      case 'shadows':
        return 'font-hand-shadows';
      case 'kalam':
      default:
        return 'font-hand-kalam';
    }
  };

  const getPaperClass = () => {
    switch (style.paper) {
      case 'grid':
        return 'paper-grid';
      case 'plain':
        return 'paper-plain';
      case 'cornell':
        return 'paper-cornell';
      case 'ruled':
      default:
        return 'paper-ruled';
    }
  };

  const getFontSizeClass = () => {
    switch (style.fontSize) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-lg';
      case 'md':
      default:
        return 'text-base';
    }
  };

  const fontClass = getFontFamilyClass();
  const paperClass = getPaperClass();
  const fontSizeClass = getFontSizeClass();

  return (
    <div
      id="handwritten-page-container"
      className={`paper-a4 ${paperClass} ${fontClass} p-8 md:p-12 relative text-slate-800 transition-all select-text`}
      style={{
        lineHeight: style.lineSpacing === 'loose' ? '2.3rem' : style.lineSpacing === 'relaxed' ? '2.1rem' : '1.9rem',
      }}
    >
      {/* Notebook Binder Rings / Punch Holes on Left */}
      <div className="absolute left-3 top-16 bottom-16 flex flex-col justify-between pointer-events-none opacity-40">
        <div className="w-3.5 h-3.5 rounded-full bg-slate-300 border border-slate-400 shadow-inner"></div>
        <div className="w-3.5 h-3.5 rounded-full bg-slate-300 border border-slate-400 shadow-inner"></div>
        <div className="w-3.5 h-3.5 rounded-full bg-slate-300 border border-slate-400 shadow-inner"></div>
      </div>

      {/* Top Header Row: Subject, Date, Page Number Box */}
      <div className="border-b-2 border-slate-400/80 pb-3 mb-6 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold">
        <div className="flex items-center gap-3">
          <span className="text-blue-800 font-bold tracking-wider uppercase text-xs px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-md">
            {note.subject || 'Study Notes'}
          </span>
          <span className="text-slate-600 text-xs italic">
            Mode: {note.mode.toUpperCase()}
          </span>
        </div>

        {style.showDateBox && (
          <div className="flex items-center gap-3">
            <div className="border-2 border-slate-400 px-3 py-0.5 rounded text-xs text-slate-700 bg-white/70">
              <span className="text-slate-500 font-normal">Date: </span>
              <span className="font-bold">{note.dateStr || new Date().toLocaleDateString('en-GB')}</span>
            </div>
            <div className="border-2 border-slate-400 px-3 py-0.5 rounded text-xs text-slate-700 bg-white/70">
              <span className="text-slate-500 font-normal">Page: </span>
              <span className="font-bold">{pageNumber} / {totalPages}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Title Banner in Blue Handwritten Ink */}
      <div className="text-center mb-8 relative">
        <h1
          className="text-2xl md:text-3xl font-extrabold tracking-wide text-blue-900 inline-block px-4 py-1"
          style={{ color: style.headingColor || '#1e40af' }}
        >
          {note.title}
        </h1>
        {/* Hand-drawn double underline */}
        <div className="w-48 h-1 bg-blue-600 mx-auto rounded-full mt-1.5 opacity-80"></div>
        <div className="w-32 h-0.5 bg-blue-400 mx-auto rounded-full mt-0.5 opacity-70"></div>
      </div>

      {/* Render Note Sections */}
      <div className={`space-y-6 ${fontSizeClass}`}>
        {note.sections.map((section, idx) => {
          return (
            <div
              key={section.id || idx}
              onClick={() => onEditSection && onEditSection(section)}
              className={`relative rounded-md transition-all ${
                isEditing
                  ? 'cursor-pointer hover:ring-2 hover:ring-blue-400/50 hover:bg-blue-50/20 p-2'
                  : ''
              }`}
            >
              {/* Heading Section */}
              {section.title && section.type !== 'important_box' && section.type !== 'table' && section.type !== 'diagram' && (
                <div className="mb-2">
                  <h2
                    className="text-lg md:text-xl font-bold tracking-wide flex items-center gap-2"
                    style={{ color: style.headingColor || '#1e40af' }}
                  >
                    <span className="text-xs bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="hand-underline-blue">{section.title}</span>
                  </h2>
                </div>
              )}

              {/* Definition Box */}
              {section.type === 'definition' && (
                <div className="my-3 pl-4 border-l-4 border-blue-600 bg-blue-50/30 py-2 pr-3 rounded-r-lg">
                  <p className="leading-relaxed text-slate-900 font-medium">
                    <KeywordHighlight
                      text={section.content || ''}
                      keywords={section.keywords}
                    />
                  </p>
                </div>
              )}

              {/* Bullet Points */}
              {section.type === 'bullet_points' && section.items && (
                <ul className="space-y-2 pl-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5">
                      <span className="text-blue-700 font-bold select-none text-base">
                        &#10003;
                      </span>
                      <span className="leading-relaxed flex-1 text-slate-800">
                        <KeywordHighlight
                          text={item}
                          keywords={section.keywords}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Red Important Points / Cautions Box */}
              {section.type === 'important_box' && (
                <div className="my-5 p-4 rounded-xl border-2 border-red-500 bg-red-50/40 shadow-sm relative">
                  <div className="flex items-center gap-2 mb-2 text-red-700 font-bold text-sm tracking-wide">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>IMPORTANT EXAM POINTS: {section.title}</span>
                  </div>

                  {section.content && (
                    <p className="text-red-950 font-medium leading-relaxed">
                      <KeywordHighlight
                        text={section.content}
                        keywords={section.keywords}
                      />
                    </p>
                  )}

                  {section.items && (
                    <ul className="space-y-1.5 mt-2">
                      {section.items.map((point, pIdx) => (
                        <li key={pIdx} className="text-red-950 text-sm leading-relaxed flex items-start gap-2">
                          <span className="text-red-600 font-bold select-none">&bull;</span>
                          <span>
                            <KeywordHighlight
                              text={point}
                              keywords={section.keywords}
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Telugu-English Dual Script Explanation */}
              {section.type === 'telugu_explanation' && (
                <div className="my-4 p-4 rounded-xl border-2 border-purple-500 bg-purple-50/30">
                  <div className="flex items-center gap-2 mb-2 text-purple-900 font-bold text-sm">
                    <span className="px-2 py-0.5 rounded bg-purple-200 text-purple-900 text-xs">
                      తెలుగు + ENGLISH
                    </span>
                    <span>{section.title}</span>
                  </div>
                  {section.content && (
                    <p className="text-slate-900 mb-2 leading-relaxed">
                      <KeywordHighlight
                        text={section.content}
                        keywords={section.keywords}
                      />
                    </p>
                  )}
                  {section.teluguContent && (
                    <div className="mt-2 pt-2 border-t border-purple-200/80 text-purple-950 font-medium leading-loose bg-white/60 p-2.5 rounded-lg">
                      <span className="text-xs font-bold text-purple-700 block mb-1">
                        సాధారణ వివరణ (In Simple Words):
                      </span>
                      {section.teluguContent}
                    </div>
                  )}
                </div>
              )}

              {/* Diagram Rendering */}
              {section.type === 'diagram' && section.diagramData && (
                <HandDrawnDiagram data={section.diagramData} fontClass={fontClass} />
              )}

              {/* Table Rendering */}
              {section.type === 'table' && section.tableData && (
                <HandDrawnTable data={section.tableData} fontClass={fontClass} />
              )}

              {/* Standard Paragraph */}
              {section.type === 'paragraph' && section.content && (
                <p
                  className="leading-relaxed text-slate-800 text-justify"
                  style={{ color: style.bodyColor || '#18181b' }}
                >
                  <KeywordHighlight
                    text={section.content}
                    keywords={section.keywords}
                  />
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Notes Signature / Exam Stamp */}
      <div className="mt-12 pt-4 border-t border-slate-300 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Verified Student Revision Sheet</span>
        </div>
        <div className="text-slate-400 italic">
          AI Handwritten Notes Generator &bull; Open-Source
        </div>
      </div>
    </div>
  );
};
