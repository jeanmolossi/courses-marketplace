import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { CodeStyle } from './styles';

interface CodeBlockProps {
  language?: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={CodeStyle}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
