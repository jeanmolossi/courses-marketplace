import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(0deg, #232526 0%, #414345 100%);
  box-shadow: 0px 4px 8px #00000075;

  height: 60px;

  padding: 0 60px;

  display: flex;
  flex-grow: 0;
  justify-content: space-between;
  align-items: center;

  > ul {
    display: flex;

    > li {
      > a {
        padding: 10px;
        border-radius: 4px;

        transition: background 0.2s;

        &.active {
          background: var(--oliveBlue);
        }

        &:hover {
          background: #ffffff30;
        }
      }
    }

    > li + li {
      margin-left: 8px;
    }
  }
`;

export const HeaderLogo = styled.div`
  font-size: 26pt;
  font-weight: bold;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
`;

export const ProfileAndNotificationSide = styled.div`
  display: flex;
  justify-content: space-between;
`;
