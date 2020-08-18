import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;

  display: flex;

  transition: all 0.2s;

  grid-column-gap: 24px;

  padding-top: 12px;

  @media screen and (max-width: 787px) {
    width: 100%;
    flex-direction: column-reverse;
  }
`;

export const Content = styled.div`
  transition: all 0.2s;

  flex: 1;
  padding-bottom: 86px;

  @media screen and (max-width: 787px) {
    padding-bottom: 16px;
    flex-direction: column-reverse;
  }
`;
