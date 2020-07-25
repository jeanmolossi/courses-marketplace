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
`;
