import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  > h3 {
    margin: 19px 0;
  }
`;

export const SingleComment = styled.div`
  display: flex;
  justify-content: space-between;

  background: var(--lightGray);
  padding: 16px;

  border-radius: 14px;

  & + div {
    margin-top: 18px;
  }
`;

export const Avatar = styled.div`
  width: 70px;
  margin-right: 10px;

  > img {
    width: 70px;
    height: 70px;

    padding: 10px;

    border-radius: 50%;

    object-fit: cover;
  }
`;

export const CommentSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  > h2,
  > h3 {
    color: #fff176;
    margin-left: 16px;
  }

  > small {
    color: #ffffff;
    opacity: 0.3;
    margin: 8px 0 0 16px;
  }
`;

export const CommentText = styled.div`
  margin-top: 15px;
  flex: 1;

  max-width: 980px;

  overflow: auto;
  overflow-wrap: break-word;

  background: var(--darkBg);
  padding: 16px;
  border-radius: 16px;
`;
