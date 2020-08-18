import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  max-width: 1080px;
  width: 100%;
  margin: 25px auto;

  > header {
    display: flex;
  }
`;

export const Avatar = styled.div`
  width: 150px;
  height: 150px;

  z-index: 3;

  > img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 787px) {
    width: 80px;
    height: 80px;
  }
`;

export const Question = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  margin-left: 24px;

  color: #fff;

  > h1 {
    color: var(--yellow);
    font-size: 36pt;
  }

  > span {
    font-weight: bold;
    font-size: 18px;

    margin-bottom: 6px;

    opacity: 0.7;
  }

  > small {
    opacity: 0.7;
  }

  @media screen and (max-width: 787px) {
    > h1 {
      font-size: 19pt;
    }
  }
`;

export const TopicBody = styled.div`
  background: var(--lightGray);
  border-radius: 15px;
  padding: 50px;

  margin-top: -24px;
`;

export const CommentsSection = styled.section`
  margin: 18px 0;
`;

export const AnswersBody = styled.main`
  display: flex;
  flex-direction: column;

  margin-top: 25px;

  > h3 {
    margin: 18px 0;
  }
`;

export const AnswersList = styled.div``;
