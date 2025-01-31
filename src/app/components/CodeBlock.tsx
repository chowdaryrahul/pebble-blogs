// components/CodeBlock.tsx
'use client'
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  children: string;
  language: string;
}

const CodeBlock = ({ children, language }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg p-1"
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter language={language} style={solarizedlight}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
