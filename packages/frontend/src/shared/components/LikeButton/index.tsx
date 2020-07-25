import React, { useCallback, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';

import { LikeButton } from './styles';

const LikeButtonComponent: React.FC = () => {
  const [alreadyLike, setAlreadyLike] = useState(false);

  const { x } = useSpring({
    from: { x: 0 },
    x: !alreadyLike ? 1 : 0,
    config: { duration: 500 },
  });

  const handleLikeDislike = useCallback(
    likeData => {
      setAlreadyLike(!alreadyLike);
      console.log(likeData);
    },
    [setAlreadyLike, alreadyLike],
  );
  return (
    <LikeButton
      alreadyLike={Number(alreadyLike)}
      onClick={() => handleLikeDislike(2)}
    >
      Curtir{' '}
      <animated.div
        style={{
          opacity: x.interpolate({ range: [0, 1], output: [1, 0.5] }),
          transform: x
            .interpolate({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            })
            .interpolate(xInterpolated => `scale(${xInterpolated})`),
        }}
      >
        <FiHeart />
      </animated.div>
    </LikeButton>
  );
};

export default LikeButtonComponent;
