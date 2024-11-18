import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownResultProps {
  content: string;
}

export function MarkdownResult({ content }: MarkdownResultProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Processed Result</h2>
      <div className="prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}