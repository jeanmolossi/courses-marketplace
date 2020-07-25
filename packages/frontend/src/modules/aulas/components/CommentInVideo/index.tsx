import React, { useCallback } from 'react';
import { FiCornerUpLeft } from 'react-icons/fi';

import { useAuth } from '@shared/hooks/Auth';
import CodeInput from '@globalComponents/CodeInput';

import { Form } from '@unform/web';
import {
  Container,
  CommentBox,
  AvatarImage,
  TextCommentBox,
  CommentButtonBox,
  CommentButton,
} from './styles';

const CommentInVideo: React.FC = () => {
  const { user } = useAuth();

  const handleSubmitComment = useCallback(comment => {
    // eslint-disable-next-line no-console
    console.log('Submit', comment);
  }, []);

  return (
    <Container>
      <h3>Deixe seu comentário</h3>

      <CommentBox>
        <AvatarImage>
          <img src={user.avatar} alt={user.name} />
        </AvatarImage>
        <Form onSubmit={handleSubmitComment}>
          <TextCommentBox>
            <CodeInput name="comment" />
          </TextCommentBox>
          <CommentButtonBox>
            <CommentButton>
              <FiCornerUpLeft /> Comentar
            </CommentButton>
          </CommentButtonBox>
        </Form>
      </CommentBox>
    </Container>
  );
};

export default CommentInVideo;
