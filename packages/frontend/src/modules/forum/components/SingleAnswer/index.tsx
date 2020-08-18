import React, { useMemo } from 'react';

import MarkupParser from '@gComponents/MarkupParser';

import dateFormatter from '@shared/utils/dateFormatter';
import Votebox from '../Votebox';

import {
  Container,
  AnswerAvatar,
  AnswerContent,
  AnswerVotes,
  AnswerBody,
  NestedAnswers,
  NestedSingle,
  NestedContent,
  NestedBody,
} from './styles';
import Commentbox from '../Commentbox';

interface User {
  id: string;
  name: string;
  email: string;
  avatarURL: string;
}

interface NestedComments {
  id: string;
  user: User;
  comment: string;
  created_at: string;
  updated_at: string;
}

interface Comment {
  id: string;
  comment: string;
  user: User;
  nestedCommentsCount: number;
  nestedComments: Array<NestedComments>;
  votes: number;
  formattedDate: string;
  created_at: string;
}

interface SingleAnswerProps {
  best?: boolean;
  payload: Comment;
}

const SingleAnswer: React.FC<SingleAnswerProps> = ({
  payload,
  best = false,
}) => {
  const nestedComments = useMemo(() => {
    if (!payload.nestedComments || payload.nestedComments.length <= 0)
      return null;

    const nested = payload.nestedComments.map(nestedComment => {
      return {
        ...nestedComment,
        formattedDate: dateFormatter(nestedComment.created_at),
      };
    });

    return nested;
  }, [payload.nestedComments]);

  const parsedDatePayload = useMemo(() => dateFormatter(payload.created_at), [
    payload.created_at,
  ]);

  return (
    <Container best={best}>
      <AnswerAvatar>
        <img src={payload.user.avatarURL} alt={payload.user.name} />
      </AnswerAvatar>
      <AnswerContent>
        <header>
          <h3>{payload.user.name}</h3>
          <small>{parsedDatePayload}</small>
        </header>
        <AnswerBody>
          <MarkupParser source={payload.comment} />
        </AnswerBody>
        <NestedAnswers>
          {nestedComments &&
            nestedComments.map(nestedComment => (
              <NestedSingle key={nestedComment.id}>
                <NestedContent>
                  <header>
                    <h3>{nestedComment.user.name}</h3>
                    <small>{nestedComment.formattedDate}</small>
                  </header>
                  <NestedBody>
                    <MarkupParser source={nestedComment.comment} />
                  </NestedBody>
                </NestedContent>
                <AnswerAvatar>
                  <img
                    src={nestedComment.user.avatarURL}
                    alt={nestedComment.user.name}
                  />
                </AnswerAvatar>
              </NestedSingle>
            ))}
        </NestedAnswers>

        <Commentbox commentId={payload.id} />
      </AnswerContent>
      <AnswerVotes>
        <Votebox votes={payload.votes} commentId={payload.id} />
      </AnswerVotes>
    </Container>
  );
};

export default SingleAnswer;
