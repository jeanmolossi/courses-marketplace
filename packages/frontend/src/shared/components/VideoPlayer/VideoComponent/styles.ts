import styled, { css } from 'styled-components';

interface AutoplayButton {
  isAutoplay: number;
}

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  padding-bottom: 56.25%;

  position: relative;

  > video {
    position: absolute;
    width: 100%;
    height: 100%;

    border-radius: 25px;

    outline: none;
  }
`;

export const VideoControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
`;

export const LeftControls = styled.div`
  display: flex;
`;

export const TimerControls = styled.div`
  display: flex;
  margin-right: 18px;
`;

export const ControllerButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;

  width: 45px;
  height: 45px;

  font-size: 14px;

  color: var(--white);

  background: var(--lightGray);
  border: 0;
  border-radius: 8px;

  box-shadow: 0px 3px 3px #00000050;

  > svg {
    font-size: 22pt;
  }

  & + button {
    margin-left: 10px;
  }
`;

export const SpeedControls = styled.div`
  display: flex;

  > button > svg {
    font-size: 18pt;
  }
`;

export const RightControlsContent = styled.div`
  display: flex;
`;

const bothProps = css`
  display: flex;

  place-items: center;
  place-content: center;

  margin-right: 18px;
  padding: 10px;

  font-size: 12pt;

  color: var(--white);

  background: var(--lightGray);
  border: 0;
  border-radius: 8px;

  box-shadow: 0px 3px 3px #00000050;

  > svg {
    font-size: 16pt;
    margin-left: 12px;
  }
`;

export const AutoPlayButton = styled.button.attrs({ type: 'button' })<
  AutoplayButton
>`
  ${bothProps}

  opacity: 0.6;
  transition: all 0.2s;

  > svg > circle {
    transition: all 0.2s;
  }

  ${props =>
    props.isAutoplay &&
    css`
      opacity: 1;

      > svg {
        > circle {
          cx: 16;
        }
      }
    `}
`;
