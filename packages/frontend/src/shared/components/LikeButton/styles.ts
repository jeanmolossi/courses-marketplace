import styled, { css } from 'styled-components';

interface LikeButton {
  alreadyLike: number;
}

export const LikeButton = styled.button.attrs({ type: 'button' })<LikeButton>`
  display: flex;

  place-items: center;
  place-content: center;

  margin-right: 18px;
  padding: 10px;

  font-size: 12pt;

  color: var(--white);

  border: 0;
  border-radius: 8px;

  box-shadow: 0px 3px 3px #00000050;

  svg {
    font-size: 16pt;
    margin-left: 12px;
  }

  background: none;
  /* background: var(--oliveBlue); */

  ${props =>
    props.alreadyLike &&
    css`
      svg {
        transform: scale(1);

        > path {
          fill: var(--salmoon);
        }
      }
    `}
`;
