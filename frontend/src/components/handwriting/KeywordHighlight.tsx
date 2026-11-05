import React from 'react';

interface KeywordHighlightProps {
  text: string;
  keywords?: string[];
  underline?: boolean;
}

export const KeywordHighlight: React.FC<KeywordHighlightProps> = ({
  text,
  keywords = [],
  underline = false,
}) => {
  if (!keywords || keywords.length === 0) {
    return <span>{text}</span>;
  }

  // Build a regex matching any of the keywords safely
  const escapedKeywords = keywords
    .filter((k) => k && k.trim().length > 0)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (escapedKeywords.length === 0) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = keywords.some(
          (k) => k.toLowerCase() === part.toLowerCase()
        );

        if (isMatch) {
          if (underline) {
            return (
              <span
                key={index}
                className="font-semibold text-blue-900 border-b-2 border-blue-500 pb-0.5 mx-0.5"
              >
                {part}
              </span>
            );
          }
          return (
            <mark
              key={index}
              className="bg-emerald-100/80 text-emerald-950 px-1 py-0.5 rounded font-semibold transition-all hover:bg-emerald-200"
              style={{
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
              }}
            >
              {part}
            </mark>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};
