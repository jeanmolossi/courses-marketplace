import styled from 'styled-components';

interface ContainerProps {
  best: boolean;
}

export const Container = styled.section<ContainerProps>`
  display: flex;
  background: var(--lightGray);

  padding: 8px;

  border-radius: 15px;
  border: 3px solid var(--lightGray);

  ${props => props.best && 'border-color: var(--lightGreen);'}

  & + section {
    margin-top: 16px;
  }

  @media screen and (max-width: 787px) {
    flex-direction: column;
    margin: 0 3px;
  }
`;

export const AnswerAvatar = styled.div`
  margin: 22px;

  > img {
    width: 60px;
    height: 60px;

    border-radius: 50%;

    object-fit: cover;
  }
`;

export const AnswerContent = styled.div`
  padding: 22px 0;
  flex: 1;

  > header {
    margin-bottom: 16px;

    > h3 {
      color: var(--lightGreen);
      font-size: 18pt;
    }
    > small {
      font-size: 13pt;
      opacity: 0.4;
    }
  }
`;

export const AnswerVotes = styled.div`
  width: 60px;
  margin: 22px;

  @media screen and (max-width: 787px) {
    display: none;
  }
`;

export const AnswerBody = styled.div`
  margin: 22px 0;
  flex: 1;
`;

export const NestedAnswers = styled.div``;

export const NestedSingle = styled.section`
  display: flex;
  border-radius: 15px;
  background: var(--darkBg);
  margin: 16px 0;
`;

export const NestedContent = styled(AnswerContent)`
  > header {
    text-align: right;
  }
`;

export const NestedBody = styled(AnswerBody)`
  margin: 22px;
`;
