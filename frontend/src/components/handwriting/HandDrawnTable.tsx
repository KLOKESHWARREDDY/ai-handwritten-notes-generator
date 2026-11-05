import React from 'react';
import { TableData } from '../../types';

interface HandDrawnTableProps {
  data: TableData;
  fontClass: string;
}

export const HandDrawnTable: React.FC<HandDrawnTableProps> = ({ data, fontClass }) => {
  return (
    <div className={`my-6 overflow-x-auto ${fontClass}`}>
      <div className="mb-2 text-sm font-bold text-blue-900 tracking-wide flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
        Table: {data.title}
      </div>

      <div className="border-2 border-slate-700 rounded-lg p-1 bg-white/60 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-700 bg-blue-50/60 text-blue-950">
              {data.headers.map((h, i) => (
                <th
                  key={i}
                  className="p-3 text-sm font-bold border-r border-slate-400 last:border-r-0 tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`border-b border-slate-300 last:border-b-0 hover:bg-amber-50/30 transition-colors ${
                  rowIdx % 2 === 1 ? 'bg-slate-50/40' : ''
                }`}
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="p-3 text-sm text-slate-800 border-r border-slate-300 last:border-r-0 leading-relaxed"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
