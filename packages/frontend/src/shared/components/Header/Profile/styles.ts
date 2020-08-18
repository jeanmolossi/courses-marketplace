import styled, { css } from 'styled-components';

interface DropdownMenuProps {
  connectionStatus?: 'Offline' | 'Online';
}

export const Container = styled.button.attrs({ type: 'button' })`
  position: relative;

  background: transparent;
  border: none;

  color: var(--white);

  &:active > div:last-child,
  &:focus > div:last-child,
  &:hover > div:last-child {
    visibility: visible;
    opacity: 1;
  }

  @media screen and (max-width: 787px) {
    margin-bottom: 18px;
    position: unset;

    &:active > div:last-child,
    &:focus > div:last-child,
    &:hover > div:last-child {
      transform: translateX(0);
    }
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin-right: 8px;

  > img {
    width: 45px;
    height: 45px;

    border-radius: 50%;

    margin-left: 12px;

    object-fit: cover;
  }
`;

export const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  z-index: 3;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  background: var(--lightGray);
  padding: 20px;
  border-radius: 12px;

  top: calc(100% + 15px);

  transition: all 0.2s;

  visibility: hidden;
  opacity: 0;

  &::after {
    content: '';
    position: absolute;

    width: 15px;
    height: 15px;

    top: -7px;
    left: 30%;

    background: var(--lightGray);
    border-radius: 2px;
    transform: rotateZ(45deg);
  }

  a,
  span {
    margin-bottom: 16px;
    padding-bottom: 16px;

    border-bottom: 2px solid var(--darkBg);

    width: 100%;
    text-align: center;

    position: relative;
  }

  > span::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--green);
    margin-right: 8px;
  }

  ${props =>
    !props.connectionStatus || props.connectionStatus === 'Offline'
      ? css`
          > span::before {
            background: var(--salmoon) !important;
          }
        `
      : ''}

  > div {
    display: flex;
    place-items: center;
    justify-content: space-around;

    border: 0;
    background: transparent;
    color: var(--white);

    > svg {
      margin-right: 8px;
      color: var(--salmoon);
    }
  }

  @media screen and (max-width: 787px) {
    top: 25%;
    right: 0;
    transform: translateX(300%);

    visibility: visible;
    opacity: 1;
  }
`;
