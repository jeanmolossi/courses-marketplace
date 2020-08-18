import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Container } from './styles';

import CodeBlock from './CodeBlock';

interface MarkupProps {
  source: string;
}

const MarkupParser: React.FC<MarkupProps> = ({ source }) => {
  return (
    <Container>
      <ReactMarkdown renderers={{ code: CodeBlock }} source={source} />
    </Container>
  );
};

export default MarkupParser;
