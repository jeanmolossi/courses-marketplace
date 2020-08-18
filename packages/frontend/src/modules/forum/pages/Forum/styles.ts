import styled, { css } from 'styled-components';

interface SingleTopicProps {
  label?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  max-width: 1080px;
  width: 100%;
  margin: 25px auto;
`;

export const ContainerHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 26px;

  > div > h3 {
    margin: 6px 0;
  }
`;

export const YodaPlace = styled.div`
  margin: 0 30px;
  width: 80px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 15px;
`;

export const ForumTabs = styled.div`
  display: flex;
  align-items: center;

  grid-column-gap: 15px;
  padding-left: 24px;

  @media screen and (max-width: 787px) {
    overflow-x: auto;
    padding-bottom: 16px;
  }
`;

export const FilterButton = styled.button.attrs({ type: 'button' })`
  color: #fff;
  background: none;
  border: none;

  @media screen and (max-width: 787px) {
    flex-shrink: 0;
  }
`;

export const ForumTopics = styled.div`
  padding: 24px;
  border-radius: 25px;
  background: var(--lightGray);
`;

export const SingleTopic = styled.div<SingleTopicProps>`
  padding-left: 75px;
  display: flex;

  justify-content: space-between;
  margin: 24px 0;

  position: relative;

  ${props =>
    props.label &&
    css`
      &:before {
        content: '${props.label}';
        position: absolute;
        top: 0;
        left: -36px;
        width: 90px;
        height: 35px;

        border-radius: 8px;

        color: #fff;

        display: flex;
        place-content: center;
        place-items: center;
      }

      &.redBadge:before {
        background: #ED7071;
      }

      &.yellowBadge:before {
        color: #000;
        background: #FFF176;
      }
    `}

  @media screen and (max-width: 787px) {
    flex-direction: column;
    padding-left: 15px;

    &:before {
      top: -48px;
    }
  }
`;

export const MainContentTopic = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  > a > h2 {
    color: #fff176;
    margin-bottom: 16px;
  }

  > a > h3,
  > a > small {
    opacity: 0.8;
    margin: 4px 0;
  }
`;

export const Engagment = styled.ul`
  display: flex;
  justify-content: space-around;

  padding: 8px 0;
  margin: 16px 0;

  border-radius: 40px;

  background: #d4d4d4;
  color: var(--darkBg);

  @media screen and (max-width: 787px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Tags = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;

  width: 35%;
  margin-left: 35px;
  margin-bottom: 40px;

  background: var(--darkBg);
  border-radius: 8px;

  padding: 10px;

  > h2 {
    margin: 0 auto 15px;
    text-align: center;
    width: 100%;
  }

  > ul {
    display: flex;
    place-items: center;
    flex-grow: 1;

    padding-bottom: 16px;

    overflow-y: hidden;
    overflow-x: auto;

    scroll-snap-type: x mandatory;
    scroll-snap-type-x: mandatory;
    scroll-snap-type: mandatory;

    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ffffff30;
      border-radius: 4px;
    }

    > li {
      scroll-snap-align: start;
      flex-shrink: 0;
      margin: 10px;

      > a {
        padding: 8px;
        border: 2px solid #d4d4d4;
        border-radius: 8px;
      }
    }
  }

  @media screen and (max-width: 787px) {
    width: 100%;

    margin-left: 0;
    flex-direction: column;
  }
`;
