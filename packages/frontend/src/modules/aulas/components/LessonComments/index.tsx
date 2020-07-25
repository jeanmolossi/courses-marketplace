import React, { useEffect, useState } from 'react';

import { formatDistance, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '@shared/services/api';

import MarkupParser from '@gComponents/MarkupParser';

import {
  Container,
  SingleComment,
  Avatar,
  CommentSide,
  CommentText,
} from './styles';

interface Like {
  id: string;
  userId: string;
}

interface Comment {
  id: string;
  userId: string;
  comment: string;
  created_at: string;
  formattedDate: string;
  user: User;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  password: string;
}

const LessonComments: React.FC = () => {
  const lessonId = 3;

  const [comments, setComments] = useState([] as Comment[]);

  useEffect(() => {
    let users: User[];
    api.get(`users`).then(response => {
      users = response.data;
    });
    api.get(`lessons/${lessonId}`).then(response => {
      const commentsFormatted = response.data.engagement.comments.map(
        (c: Comment) => {
          const parsedDate = parseISO(c.created_at);
          return {
            ...c,
            formattedDate: formatDistance(parsedDate, new Date(), {
              addSuffix: true,
              locale: ptBR,
            }),
          };
        },
      );

      const commentsWithUser = commentsFormatted.map((comment: Comment) => {
        const user: User | undefined = users.find(u => u.id === comment.userId);

        if (!user) return comment;

        delete user.password;
        delete user.email;

        return {
          ...comment,
          user,
        };
      });
      setComments(commentsWithUser);
    });
  }, []);

  return (
    <Container>
      <h3>Comentários</h3>

      {comments.map(comment => (
        <SingleComment key={comment.id}>
          <Avatar>
            <img src={comment.user.avatar} alt={comment.user.name} />
          </Avatar>
          <CommentSide>
            <h2>{comment.user.name}</h2>
            <small>{comment.formattedDate}</small>
            <CommentText>
              <MarkupParser source={comment.comment} />
            </CommentText>
          </CommentSide>
        </SingleComment>
      ))}
    </Container>
  );
};

export default LessonComments;
