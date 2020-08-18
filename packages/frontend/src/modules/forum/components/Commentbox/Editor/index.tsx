import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FiX } from 'react-icons/fi';
import Editor from 'react-simple-code-editor';
import { useField } from '@unform/core';
import { highlight, languages } from 'prismjs';

import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-dark.css';

import MarkupParser from '@gComponents/MarkupParser';

import { Container, PreviewModal, PreviewContent, PreviewCode } from './styles';

interface Props {
  name: string;
}
const CodeInput: React.FC<Props> = ({ name }) => {
  const [code, setCode] = useState('');
  const editorRef = useRef(null);
  const { defaultValue, fieldName, registerField } = useField(name);

  const [previewToggle, setPreviewToggle] = useState(true);
  const [codePreview, setCodePreview] = useState('');

  const handlePreview = useCallback(() => {
    setCodePreview(code !== '' ? code : 'Nada a visualizar');
    setPreviewToggle(false);
  }, [code]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: editorRef.current,
      path: '_input.value',
      setValue(_: any, value: string) {
        setCode(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Editor
        className="editor"
        textareaId={fieldName}
        value={code}
        defaultValue={defaultValue}
        onValueChange={setCode}
        highlight={_code => highlight(_code, languages.markup, 'markup')}
        padding={15}
        ref={editorRef}
      />

      <button type="button" onClick={() => handlePreview()}>
        Preview
      </button>

      <PreviewModal aria-hidden={previewToggle}>
        <PreviewContent>
          <header>
            <h1>Preview</h1>
            <button type="button" onClick={() => setPreviewToggle(true)}>
              <FiX />
            </button>
          </header>
          <PreviewCode>
            <MarkupParser source={codePreview} />
          </PreviewCode>
        </PreviewContent>
      </PreviewModal>
    </Container>
  );
};
export default CodeInput;
