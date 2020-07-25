import React, {
  ComponentType,
  useMemo,
  useRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { uuid } from 'uuidv4';
import { useField } from '@unform/core';
import { FiHelpCircle, FiEye } from 'react-icons/fi';

import {
  Container,
  InputBox,
  LeftIconBox,
  RightIconBox,
  EyeButton,
  ErrorBox,
} from './styles';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  forId?: string;
  icon: ComponentType<IconBaseProps>;
  helpText?: string;
  containerStyle?: React.CSSProperties;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  forId,
  icon: Icon,
  helpText,
  containerStyle = {},
  type = 'text',
  ...rest
}) => {
  const inputRef = useRef({} as HTMLInputElement);

  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleRevealPassword = useCallback(() => {
    inputRef.current.type = 'text';
  }, []);

  const handleHidePassword = useCallback(() => {
    inputRef.current.type = 'password';
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current.value);
  }, []);

  const htmlFor = useMemo(() => {
    if (forId) return forId;
    return uuid();
  }, [forId]);

  const { defaultValue, fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle}>
      <label htmlFor={htmlFor}>{label}: </label>
      <InputBox hasError={!!error} isFilled={isFilled} isFocused={isFocused}>
        <LeftIconBox>
          <Icon />
        </LeftIconBox>

        <input
          ref={inputRef}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          name={name}
          type={type}
          id={htmlFor}
          {...rest}
        />

        <RightIconBox>
          {type === 'password' && (
            <EyeButton
              onMouseDown={handleRevealPassword}
              onMouseUp={handleHidePassword}
            >
              <FiEye />
            </EyeButton>
          )}
          {type !== 'password' && helpText ? <FiHelpCircle /> : ''}
        </RightIconBox>
      </InputBox>
      {error && <ErrorBox>{error}</ErrorBox>}
    </Container>
  );
};

export default Input;
