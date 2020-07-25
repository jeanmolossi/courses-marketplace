import styled, { keyframes } from 'styled-components';

import BackgroundImage from '../../../../assets/RegisterBackground.svg';

export const Container = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;

  justify-content: space-between;
  flex-direction: row-reverse;
`;

export const LeftSideOfSignUp = styled.div`
  display: flex;

  width: 600px;

  place-content: center;
  place-items: center;

  overflow-x: hidden;
`;

const initialAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(90px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const MiddleContents = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 425px;
  width: 100%;

  animation: ${initialAnimation} 0.6s;

  > h1 {
    margin-bottom: 36px;
  }

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > a {
    margin-top: 28px;
    text-align: center;

    > span {
      color: var(--oliveBlue);
    }

    &:hover > span {
      text-decoration: underline;
    }
  }
`;

export const Button = styled.button`
  margin-top: 36px;
  background: var(--oliveBlue);
  color: var(--white);
  border: 0;
  padding: 12px 26px;
  border-radius: 8px;

  display: flex;
  place-items: center;

  > svg {
    margin-right: 8px;
  }
`;

export const RightSideOfSignUp = styled.div`
  flex: 1;
  max-width: 50%;

  background: url(${BackgroundImage});
  background-size: cover;
  background-position: center center;
`;
