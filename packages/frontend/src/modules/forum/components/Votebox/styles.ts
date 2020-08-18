import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 60px;
  border-radius: 5px;
  border: 3px solid var(--yellow);
`;

export const VoteButton = styled.button`
  background: transparent;
  color: var(--yellow);

  border: 0;
  width: 54px;
  height: 54px;
  text-align: center;
  font-size: 18pt;

  transition: 0.3s;

  &:hover {
    background: var(--yellow);
    color: var(--darkBg);
  }

  ${props =>
    props.disabled &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
      filter: grayscale(0.8);
    `}
`;

export const VotesTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 54px;
  height: 60px;
  border-top: 3px solid var(--yellow);
  border-bottom: 3px solid var(--yellow);
  color: var(--yellow);
`;
