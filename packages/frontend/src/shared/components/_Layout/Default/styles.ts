import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  min-height: 100vh;
  height: 100%;

  @media screen and (max-width: 787px) {
    overflow-x: hidden;
  }
`;
