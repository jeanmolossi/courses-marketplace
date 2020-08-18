import styled, { css } from 'styled-components';

interface NotificationProps {
  read: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding: 8px;

  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #fff2;
    border-radius: 4px;
  }
`;

export const SingleNotification = styled.div<NotificationProps>`
  display: flex;

  justify-content: space-between;
  align-items: center;

  & + div {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 2px solid var(--darkBg);
  }

  ${props =>
    !props.read &&
    css`
      background: linear-gradient(0deg, #1a298030 -84.92%, #26d0ce30 172.22%);
    `}
`;

export const LeftSide = styled.div`
  width: 60px;
  height: 100%;

  display: flex;
  flex-direction: column;

  place-content: center;
  place-items: center;
`;

export const IconBox = styled.div`
  display: flex;
  place-items: center;
  place-content: center;
  flex-shrink: 0;
  flex-grow: 0;

  font-size: 18pt;

  padding: 8px;
  width: 42px;
  height: 42px;

  border-radius: 50%;
  background: #9a9a9a;

  border: 2px solid var(--darkBg);

  > svg {
    color: var(--darkBg);
    filter: opacity(0.5);
  }
`;

export const MarkasRead = styled.button`
  border: 0;
  background: transparent;
  color: #fff;

  margin-top: 12px;
`;

export const NotificationDetails = styled.div`
  flex: 1;

  > small {
    font-size: 10pt;
    opacity: 0.5;
  }
`;
