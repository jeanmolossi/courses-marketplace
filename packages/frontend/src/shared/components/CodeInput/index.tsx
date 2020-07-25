import React, { useState, useEffect, useRef } from 'react';
import Editor from 'react-simple-code-editor';

import { highlight, languages } from 'prismjs';

import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-dark.css';

import { useField } from '@unform/core';

import { Container, EditorInput } from './styles';

interface InputProps {
  name: string;
}

const CodeInput: React.FC<InputProps> = ({ name, ...rest }) => {
  const [code, setCode] = useState('');

  const editorRef = useRef({} as Editor);

  const { defaultValue, fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: editorRef.current,
      path: 'props.value',
      setValue(_: any, value: string) {
        setCode(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <EditorInput
        className="editor"
        textareaId={fieldName}
        value={code}
        defaultValue={defaultValue}
        onValueChange={setCode}
        highlight={iCode => highlight(iCode, languages.javascript, 'markup')}
        padding={15}
        tabSize={2}
        ref={editorRef}
        {...rest}
      />
    </Container>
  );
};

export default CodeInput;
