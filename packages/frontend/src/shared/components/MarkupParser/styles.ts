import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';
import { monokaiSublime as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const MarkdownText = styled(Markdown)`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  pre,
  code {
    margin: 16px 0;
  }
`;

export const styles = theme;
