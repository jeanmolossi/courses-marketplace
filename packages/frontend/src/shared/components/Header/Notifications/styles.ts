import styled, { css } from 'styled-components';

interface BellButtonProps {
  hasNotification: number;
}

export const Container = styled.div`
  display: flex;
  margin-right: 48px;

  align-items: center;
`;

export const NotificationsBox = styled.div`
  position: relative;
`;

export const BellButton = styled.button<BellButtonProps>`
  background: transparent;
  color: var(--white);

  font-size: 18pt;
  border: 0;

  padding: 8px;

  flex: 1;

  position: relative;

  ${props =>
    props.hasNotification &&
    css`
      &::after {
        content: '';

        position: absolute;
        top: 8px;
        right: 7px;

        width: 8px;
        height: 8px;
        border-radius: 50%;

        background: var(--salmoon);
      }
    `}

  @media screen and (max-width: 787px) {
    position: unset;
  }
`;

interface Dropdownprops {
  isOpened: number;
}

export const NotificationsDropDown = styled.div<Dropdownprops>`
  position: absolute;
  display: block;
  z-index: 3;

  transform: translateX(-50%);

  width: 280px;
  height: 280px;

  background: var(--lightGray);

  border-radius: 12px;
  padding: 8px;

  opacity: 0;
  visibility: hidden;

  ${props =>
    props.isOpened &&
    css`
      opacity: 1;
      visibility: visible;
    `}

  &::after {
    content: '';

    position: absolute;

    top: -7px;
    left: calc(50% + 13px);

    width: 15px;
    height: 15px;

    border-radius: 2px;

    background: var(--lightGray);

    transform: rotateZ(45deg);
  }

  @media screen and (max-width: 787px) {
    top: 0;
    left: 0;

    z-index: 4;

    position: fixed;

    transform: translateX(100%);

    flex: 1;
    width: 100%;
    height: 100%;

    transition: all 0.2s;

    ${props => props.isOpened && 'transform: translateX(0%);'}
  }
`;

export const CloseButton = styled.button.attrs({ type: 'button' })`
  display: none;
  background: none;
  color: var(--white);
  border: 0;
  font-size: 24pt;

  top: 20px;
  right: 20px;

  @media screen and (max-width: 787px) {
    display: block;
    position: absolute;
  }
`;
