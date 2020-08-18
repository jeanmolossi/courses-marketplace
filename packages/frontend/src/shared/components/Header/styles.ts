import styled, { css } from 'styled-components';

interface ContainerProps {
  closed: number;
}

export const Container = styled.div<ContainerProps>`
  background: linear-gradient(0deg, #232526 0%, #414345 100%);
  box-shadow: 0px 4px 8px #00000075;

  height: 60px;

  padding: 0 60px;

  display: flex;
  flex-grow: 0;
  justify-content: space-between;
  align-items: center;

  > ul {
    display: flex;

    > li {
      > a {
        padding: 10px;
        border-radius: 4px;

        transition: background 0.2s;

        &.active {
          background: var(--oliveBlue);
        }

        &:hover {
          background: #ffffff30;
        }
      }
    }

    > li + li {
      margin-left: 8px;
    }
  }

  @media screen and (max-width: 787px) {
    position: fixed;
    z-index: 5;

    width: 100vw;
    height: 100vh;

    padding: 20px 0;

    flex-direction: column;
    justify-content: space-evenly;

    > ul {
      flex-direction: column;

      flex: 1;

      > li {
        margin: 15px 0;
      }
    }

    transition: 0.2s;

    ${props =>
      !!props.closed &&
      css`
        transform: translateX(100%);
      `}
  }
`;

const buttonStyles = css`
  display: none;
  background: none;

  color: var(--white);
  border: 0;
  font-size: 24pt;

  place-content: center;
  place-items: center;
  padding: 8px;
  border-radius: 8px;

  @media screen and (max-width: 787px) {
    display: block;
    position: absolute;
  }
`;

export const CloseButton = styled.button.attrs({ type: 'button' })`
  ${buttonStyles}

  @media screen and (max-width: 787px) {
    top: 20px;
    left: 20px;
  }
`;

export const OpenMenuButton = styled.button.attrs({ type: 'button' })`
  ${buttonStyles}

  background: var(--darkBg);

  @media screen and (max-width: 787px) {
    top: 20px;
    left: -50px;
  }
`;

export const HeaderLogo = styled.div`
  font-size: 26pt;
  font-weight: bold;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
`;

export const ProfileAndNotificationSide = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 787px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;
