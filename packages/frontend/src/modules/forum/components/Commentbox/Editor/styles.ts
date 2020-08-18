import styled, { css } from 'styled-components';

export const Container = styled.div`
  flex: 1;

  > button {
    padding: 8px;
    border-radius: 6px;
    border: 0;

    background: var(--yellow);
    color: var(--darkBg);
  }

  @media screen and (max-width: 787px) {
    display: flex;
    flex-direction: column;
  }
`;

export const PreviewModal = styled.div`
  position: fixed;

  top: 0;
  left: 0;

  z-index: 9;

  width: 100vw;
  height: 100vh;

  display: flex;
  place-content: center;
  place-items: center;

  background: #00000095;

  transition: 0.2s all;

  ${props =>
    props['aria-hidden'] &&
    css`
      visibility: hidden;
      opacity: 0;
    `}
`;

export const PreviewContent = styled.div`
  background: var(--lightGray);
  flex: 1;
  max-width: 1080px;
  height: 80%;

  padding: 25px;
  border-radius: 15px;

  > header {
    display: flex;
    justify-content: space-between;

    width: 100%;

    > button {
      color: #fff;
      font-size: 24pt;
      border: 0;
      border-radius: 50%;
      background: transparent;
    }
  }
`;

export const PreviewCode = styled.div`
  margin: 20px;
`;
