import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 25px auto;
  padding: 25px;

  border-radius: 15px;
  width: 100%;
  max-width: 800px;
  flex: 1;

  background: var(--lightGray);

  box-shadow: #00000075 0 0 18px, #ffffff20 -8px -8px 30px,
    #00000075 8px 8px 30px;
`;

export const EditProfile = styled(Form)`
  width: 100%;
  max-width: 600px;

  margin: 25px auto;

  > section {
    margin: 15px 0 25px;

    & + section {
      padding-top: 15px;
      border-top: 2px solid var(--darkBg);
    }

    > header {
      margin-bottom: 14px;
    }
  }
`;

export const AvatarInput = styled.div`
  margin: 18px auto;
  position: relative;
  width: 186px;

  > img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
    object-fit: cover;
  }

  > label {
    display: flex;
    place-content: center;
    place-items: center;

    position: absolute;
    right: 0;
    bottom: 0;

    width: 46px;
    height: 46px;

    border-radius: 50%;
    border: 0;
    background: var(--oliveBlue);
    color: #fff;

    transition: filter 0.2s;

    > input {
      display: none;
    }

    &:hover {
      filter: grayscale(70%);
    }
  }
`;

export const EditButton = styled.button.attrs({ type: 'submit' })`
  display: flex;
  place-items: center;
  justify-content: space-around;

  padding: 8px 12px;
  border-radius: 6px;
  border: 0;

  background: var(--green);
  color: var(--white);

  > svg {
    margin-right: 8px;
  }
`;
