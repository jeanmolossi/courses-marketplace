import React, { useCallback, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';

import api from '@shared/services/api';
import { useAuth } from '@shared/hooks/Auth';
import { LikeButton } from './styles';

interface LikeButtonProps {
  containerStyles?: any;
  liked?: boolean | string;
  topicId?: string;
  lessonId?: string;
}

const LikeButtonComponent: React.FC<LikeButtonProps> = ({
  liked = false,
  topicId,
  lessonId,
}) => {
  const { user } = useAuth();
  const [alreadyLike, setAlreadyLike] = useState(liked);

  const { x } = useSpring({
    from: { x: 0 },
    x: !alreadyLike ? 1 : 0,
    config: { duration: 500 },
  });

  const handleDispatchLikeTopic = useCallback(
    payload => {
      if (!alreadyLike) {
        api.post(`likes/like`, { topicId: payload }).then(({ data }) => {
          if (data.id) {
            setAlreadyLike(!alreadyLike);
          }
        });
      } else {
        api
          .delete(`likes/unlike`, {
            params: {
              topicId: payload,
              userId: user.id,
            },
          })
          .then(({ data }) => {
            if (data) {
              setAlreadyLike(!alreadyLike);
            }
          });
      }
    },
    [alreadyLike, user.id],
  );

  const handleLikeDislike = useCallback(() => {
    if (topicId) {
      handleDispatchLikeTopic(topicId);
      return;
    }
    if (lessonId) {
      setAlreadyLike(!alreadyLike);
    }
  }, [setAlreadyLike, alreadyLike, topicId, lessonId, handleDispatchLikeTopic]);

  return (
    <LikeButton
      alreadyLike={Number(!!alreadyLike)}
      onClick={() => handleLikeDislike()}
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
