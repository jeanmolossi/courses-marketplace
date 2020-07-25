import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';

import { highlight, languages } from 'prismjs';

import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-dark.css';

import { MarkdownText, styles } from './styles';

interface MarkupProps {
  source: string;
}

const MarkupParser: React.FC<MarkupProps> = ({ source }) => {
  return (
    <MarkdownText
      options={{
        overrides: {
          code: {
            component: SyntaxHighlighter,
            props: {
              highlight: (c: string) =>
                highlight(c, languages.markup, 'markup'),
              style: styles,
            },
          },
        },
      }}
    >
      {source}
    </MarkdownText>
  );
};

export default MarkupParser;
