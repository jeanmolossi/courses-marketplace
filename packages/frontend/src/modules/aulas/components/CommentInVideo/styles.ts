import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > h3 {
    margin: 24px 0;
  }
`;

export const CommentBox = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 19px;

  background: var(--lightGray);
  border-radius: 12px;

  > form {
    flex: 1;
    display: flex;
    width: 100%;

    > textarea {
      flex: 1;
    }
  }
`;

export const AvatarImage = styled.div`
  width: 50px;
  margin-right: 19px;

  > img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

export const TextCommentBox = styled.div`
  flex: 1;
  display: flex;
`;

export const CommentButtonBox = styled.div`
  margin-left: 19px;
  margin-bottom: 4px;

  align-self: flex-end;
  justify-self: flex-end;
`;

export const CommentButton = styled.button.attrs({ type: 'submit' })`
  background: var(--oliveBlue);
  color: #fff;
  border: 0;
  padding: 10px;
  border-radius: 8px;
`;
