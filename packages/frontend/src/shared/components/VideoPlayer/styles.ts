import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding-right: 30px;

  @media screen and (max-width: 787px) {
    padding: 8px;
  }
`;

export const VideoHeader = styled.h1`
  padding: 10px;
`;

export const VideoContainer = styled.div`
  display: block;

  width: 100%;
`;
