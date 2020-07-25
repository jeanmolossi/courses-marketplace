import styled, { css } from 'styled-components';

interface InputBoxProps {
  hasError: boolean;
  isFilled: boolean;
  isFocused: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  justify-content: space-between;
  width: 100%;

  > label {
    margin-bottom: 10px;
  }

  & + div {
    margin-top: 26px;
  }
`;

export const InputBox = styled.div<InputBoxProps>`
  display: flex;

  border: 2px solid var(--bege);
  border-radius: 6px;

  align-items: center;

  transition: all 0.3s;

  > input {
    flex: 1;
    line-height: 2.5;
    background: transparent;
    border: none;
    color: var(--white);

    &::placeholder {
      color: var(--white);
      opacity: 0.8;
    }
  }

  ${props =>
    props.isFocused &&
    css`
      border-color: var(--oliveBlue);
      color: var(--oliveBlue);

      svg {
        color: var(--oliveBlue);
      }
      input {
        color: var(--oliveBlue);
      }
    `};

  ${props =>
    props.isFilled &&
    css`
      border-color: var(--lightGreen);
      color: var(--lightGreen);

      svg {
        color: var(--lightGreen);
      }
      input {
        color: var(--lightGreen);
      }
    `};

  ${props =>
    props.hasError &&
    css`
      border-color: var(--salmoon);
      color: var(--salmoon);

      svg {
        color: var(--salmoon);
      }
      input {
        color: var(--salmoon);
      }
    `};
`;

export const LeftIconBox = styled.div`
  margin: 0 10px;
  font-size: 18pt;
  color: var(--bege);

  display: flex;
  place-items: center;
`;

export const RightIconBox = styled.div`
  margin: 0 10px;
  font-size: 18pt;
  color: var(--bege);

  display: flex;
  place-items: center;
`;

export const EyeButton = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: 0;
  color: var(--bege);
  font-size: 18pt;

  display: flex;
  place-items: center;
`;

export const ErrorBox = styled.div`
  position: absolute;
  top: 100%;
  color: var(--salmoon);
`;
