import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 15px;
  background: var(--lightGray);

  padding: 22px;

  display: flex;

  @media screen and (max-width: 787px) {
    flex-direction: column;
  }
`;

export const AvatarSide = styled.div`
  width: 65px;
  height: 65px;

  margin-right: 16px;

  > img {
    width: 65px;
    height: 65px;

    border-radius: 33px;
  }
`;

export const CommentBox = styled.div`
  flex: 1;

  > h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;

    color: #ffffff;
    opacity: 0.7;

    display: flex;

    align-items: baseline;
    justify-content: space-between;
    flex: 1;
  }

  div.editor {
    margin: 22px 0;
    padding: 22px;
    border-radius: 15px;

    background: var(--darkBg);

    min-height: 150px;
    flex: 1;
  }

  > form {
    display: flex;
    flex: 1;
    justify-content: space-between;

    @media screen and (max-width: 787px) {
      flex-direction: column;
    }
  }
`;

export const CommentButtons = styled.section`
  display: flex;
  max-width: 80px;
  flex-shrink: 0;
  flex-grow: 0;
  align-items: flex-start;

  margin: 26px;

  > button {
    padding: 8px;
    border-radius: 6px;
    border: 0;

    background: var(--oliveBlue);
    color: #fff;
  }
`;
