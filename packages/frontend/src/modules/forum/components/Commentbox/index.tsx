import React, { useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useAuth } from '@shared/hooks/Auth';
import { useToast } from '@shared/hooks/Toasts';
import api from '@shared/services/api';

import CodeInput from './Editor';

import { Container, AvatarSide, CommentBox, CommentButtons } from './styles';

interface CommentboxProps {
  topicId?: string;
  commentId?: string;
}

const Commentbox: React.FC<CommentboxProps> = ({ topicId, commentId }) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    ({ editor }) => {
      if (editor.length < 120) {
        addToast({
          type: 'info',
          title: 'Sua resposta deve ter no mínimo 120 caracteres',
        });
        return;
      }
      if (topicId) {
        api
          .post(`comments/create`, {
            topic: topicId,
            comment: editor,
          })
          .then(_response => {
            addToast({
              type: 'success',
              title: 'Comentário adicionado',
              description: 'Logo você verá seu comentário. Ele já foi enviado',
            });
          })
          .catch(_err => console.log(editor));
        return;
      }
      if (commentId) {
        api
          .post(`nestedcomments/create`, {
            commentRef: commentId,
            comment: editor,
          })
          .then(_response => {
            addToast({
              type: 'success',
              title: 'Comentário adicionado',
              description: 'Logo você verá seu comentário. Ele já foi enviado',
            });
          })
          .catch(_err => console.log(editor));
      }
    },
    [topicId, commentId, addToast],
  );

  const formRef = useRef({} as FormHandles);

  return (
    <>
      <Container>
        <AvatarSide>
          <img src={user.avatarURL} alt={user.name} />
        </AvatarSide>
        <CommentBox>
          <h2>
            Responda à pergunta <small>Markdown ativado</small>
          </h2>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <CodeInput name="editor" />
            <CommentButtons>
              <button type="submit">Responder</button>
            </CommentButtons>
          </Form>
        </CommentBox>
      </Container>
    </>
  );
};

export default Commentbox;
