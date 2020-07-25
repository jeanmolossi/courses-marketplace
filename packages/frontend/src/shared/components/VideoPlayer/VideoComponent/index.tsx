import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MdReplay10, MdForward10, MdFastForward } from 'react-icons/md';
import { FiToggleLeft } from 'react-icons/fi';

import LikeButtonComponent from '@globalComponents/LikeButton';

import {
  Container,
  VideoControls,
  LeftControls,
  TimerControls,
  ControllerButton,
  SpeedControls,
  RightControlsContent,
  AutoPlayButton,
} from './styles';

interface VideoComponentProps {
  videoSource: string;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ videoSource }) => {
  const video = useRef({} as HTMLVideoElement);

  const [autoplay, setAutoplay] = useState(() => {
    const isAutoplay = localStorage.getItem('@CodeLearn:autoplay');
    if (isAutoplay) return JSON.parse(isAutoplay);

    return false;
  });

  const handleToggleAutoplay = useCallback(() => {
    if (autoplay) {
      localStorage.removeItem('@CodeLearn:autoplay');
      setAutoplay(false);
      return;
    }
    localStorage.setItem('@CodeLearn:autoplay', JSON.stringify(true));
    setAutoplay(true);
  }, [autoplay]);

  const handleReplay10 = useCallback(() => {
    video.current.currentTime -= 10;
  }, []);

  const handleForward10 = useCallback(() => {
    video.current.currentTime += 10;
  }, []);

  const handleChangeVideoSpeed = useCallback(speed => {
    video.current.playbackRate = speed;
  }, []);

  useEffect(() => {
    video.current.src = videoSource;
  }, [videoSource]);

  return (
    <>
      <Container>
        <video
          ref={video}
          controlsList="nodownload"
          controls
          autoPlay={autoplay}
          onContextMenu={e => {
            e.preventDefault();
            console.log('Contextmenu');
          }}
        />
      </Container>
      <VideoControls>
        <LeftControls>
          <TimerControls>
            <ControllerButton onClick={() => handleReplay10()}>
              <MdReplay10 />
            </ControllerButton>

            <ControllerButton onClick={() => handleForward10()}>
              <MdForward10 />
            </ControllerButton>
          </TimerControls>

          <SpeedControls>
            <ControllerButton onClick={() => handleChangeVideoSpeed(1)}>
              <MdFastForward />
              1x
            </ControllerButton>

            <ControllerButton onClick={() => handleChangeVideoSpeed(1.5)}>
              <MdFastForward />
              1.5x
            </ControllerButton>

            <ControllerButton onClick={() => handleChangeVideoSpeed(2)}>
              <MdFastForward />
              2x
            </ControllerButton>
          </SpeedControls>
        </LeftControls>

        <RightControlsContent>
          <LikeButtonComponent />

          <AutoPlayButton
            isAutoplay={Number(autoplay)}
            onClick={handleToggleAutoplay}
          >
            Autoplay <FiToggleLeft />
          </AutoPlayButton>
        </RightControlsContent>
      </VideoControls>
    </>
  );
};

export default VideoComponent;
