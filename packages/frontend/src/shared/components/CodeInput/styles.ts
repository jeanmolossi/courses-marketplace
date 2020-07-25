import styled from 'styled-components';
import Editor from 'react-simple-code-editor';

import 'prismjs/themes/prism-dark.css';

export const Container = styled.div`
  flex: 1;
`;

export const EditorInput = styled(Editor)`
  width: 100%;
  min-height: 180px;

  background: #282a36;

  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--darkBg);

  box-shadow: inset 0 0 16px #00000030;

  > pre {
    z-index: 9;
  }
`;
