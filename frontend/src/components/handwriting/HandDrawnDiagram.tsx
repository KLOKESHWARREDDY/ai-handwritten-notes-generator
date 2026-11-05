import React from 'react';
import { DiagramData } from '../../types';

interface HandDrawnDiagramProps {
  data: DiagramData;
  fontClass: string;
}

export const HandDrawnDiagram: React.FC<HandDrawnDiagramProps> = ({ data, fontClass }) => {
  const getNodeColorClass = (color?: string) => {
    switch (color) {
      case 'red':
        return 'border-red-500 bg-red-50/60 text-red-900';
      case 'green':
        return 'border-emerald-600 bg-emerald-50/60 text-emerald-950';
      case 'purple':
        return 'border-purple-600 bg-purple-50/60 text-purple-950';
      default:
        return 'border-blue-600 bg-blue-50/60 text-blue-950';
    }
  };

  return (
    <div className={`my-6 p-4 rounded-xl border-2 border-dashed border-slate-300 bg-amber-50/20 ${fontClass}`}>
      <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          {/* Hand-drawn icon */}
          <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
            <path d="M7 12h10M12 7v10" />
          </svg>
          <span className="text-base font-bold text-blue-800 tracking-wide">
            [ Fig: {data.title} ]
          </span>
        </div>
        <span className="text-xs text-slate-600 italic bg-white/80 px-2 py-0.5 rounded hand-border">
          {data.type.toUpperCase()}
        </span>
      </div>

      {/* Nodes visual flow */}
      <div className="flex flex-wrap items-center justify-center gap-4 py-2">
        {data.nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <div
              className={`p-3 min-w-[140px] max-w-[200px] text-center rounded-lg border-2 shadow-sm transition-transform hover:-rotate-1 ${getNodeColorClass(
                node.color
              )}`}
              style={{
                borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
              }}
            >
              <div className="text-sm font-bold tracking-tight">{node.label}</div>
              {node.sublabel && (
                <div className="text-xs mt-1 opacity-80 border-t border-current/20 pt-1">
                  {node.sublabel}
                </div>
              )}
            </div>

            {/* Organic hand-drawn arrow connector */}
            {index < data.nodes.length - 1 && (
              <div className="flex flex-col items-center justify-center text-slate-500 px-1">
                <svg className="w-8 h-6 text-slate-600 animate-pulse" viewBox="0 0 40 24" fill="none">
                  <path
                    d="M2 12 C 12 8, 26 16, 36 12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M28 6 L 37 12 L 29 18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {data.links?.[index]?.label && (
                  <span className="text-[11px] text-slate-500 font-medium -mt-1 bg-white/70 px-1 rounded">
                    {data.links[index].label}
                  </span>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
