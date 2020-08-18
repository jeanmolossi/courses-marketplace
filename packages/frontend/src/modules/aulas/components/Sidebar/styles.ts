import styled, { css } from 'styled-components';

interface LessonProps {
  status: 'Complete' | 'Incomplete' | 'Watching';
}

export const Container = styled.div`
  background: var(--lightGray);
  border-top-right-radius: 18px;

  transition: all 0.3s;

  padding: 18px;

  display: flex;
  flex-direction: column;

  width: 280px;

  @media screen and (max-width: 787px) {
    width: 100%;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;

  > button {
    background: transparent;
    padding: 0 10px;
    color: var(--white);
    border: 0;

    font-size: 24pt;

    display: flex;
    place-items: center;

    height: 100%;
    transition: all 0.3s;
  }

  > h1 {
    transition: all 0.3s;
  }
`;

export const SidebarContent = styled.div``;

export const SidebarModule = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SidebarModuleHeader = styled.h2`
  display: flex;

  place-items: center;
  justify-content: space-between;

  margin: 20px 0;

  font-size: 14pt;

  > svg {
    font-size: 24pt;
  }

  > span {
    flex: 1;
    margin-left: 10px;

    transition: all 0.3s;
  }
`;

export const Lesson = styled.div<LessonProps>`
  display: flex;

  > button {
    background: transparent;
    color: #fff;
    border: 0;
    margin-right: 10px;
  }

  > a {
    margin: 8px 0;
  }

  ${props =>
    props.status === 'Complete' &&
    css`
      > a,
      > button > svg {
        color: #87cd8a;
      }
    `}
  ${props =>
    props.status === 'Watching' &&
    css`
      > a,
      > button > svg {
        color: #fff176;
      }
    `}
`;
