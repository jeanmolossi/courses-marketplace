import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { parseISO, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/esm/locale';

import DefaultLayout from '@gComponents/_Layout/Default';
import MarkupParser from '@gComponents/MarkupParser';
import LikeButtonComponent from '@gComponents/LikeButton';

import api from '@shared/services/api';

import { useAuth } from '@shared/hooks/Auth';

import Commentbox from '@modules/forum/components/Commentbox';
import SingleAnswer from '@modules/forum/components/SingleAnswer';

import {
  Container,
  Avatar,
  Question,
  TopicBody,
  AnswersBody,
  AnswersList,
  CommentsSection,
} from './styles';

interface User {
  id: string;
  name: string;
  email: string;
  avatarURL: string;
}

interface Comments {
  id: string;
  comment: string;
  user: User;
  nestedCommentsCount: number;
  nestedComments: Array<any>;
  formattedDate: string;
  votes: number;
  created_at: string;
}

interface Like {
  id: string;
  userId: string;
  user: User;
}

interface Topic {
  id: string;
  title: string;
  user: User;
  text: string;
  comments: Comments[];
  commentsCount: number;
  likesCount: number;
  likes: Like[];
  formattedDate: string;
  created_at: string;
}

const Topic: React.FC = () => {
  const { topicId } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState({} as Topic);
  const [bestComment, setBestComment] = useState({} as Comments);

  useEffect(() => {
    const getTopic = api.get<Topic>(`topics/index/${topicId}`);
    const getComments = api.get<Comments>(`comments/best/${topicId}`);

    setLoading(true);

    Promise.all([getTopic, getComments]).then(([topics, comments]) => {
      const parsedDate = parseISO(topics.data.created_at);

      const formattedDate = formatDistance(parsedDate, new Date(), {
        addSuffix: true,
        locale: ptBR,
      });

      const parsedTopic = {
        ...topics.data,
        formattedDate,
      };

      setTopic(parsedTopic);

      setBestComment(comments.data);

      setLoading(false);
    });
  }, [topicId]);

  const liked = useMemo(() => {
    if (topic.likesCount === 0 || !topic.likes) return false;

    const userHasLike = topic.likes.find(likes => likes.userId === user.id);

    if (!userHasLike) return false;

    return userHasLike.id;
  }, [topic.likes, topic.likesCount, user.id]);

  return (
    <DefaultLayout>
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <Container>
          <header>
            <Avatar>
              <img src={topic.user.avatarURL} alt={topic.user.name} />
            </Avatar>

            <Question>
              <h1>{topic.title}</h1>
              <span>{topic.user.name}</span>
              <small>{topic.formattedDate}</small>
            </Question>
          </header>

          <TopicBody>
            <MarkupParser source={topic.text} />

            <LikeButtonComponent
              containerStyles={{ color: '#191C21' }}
              liked={liked}
              topicId={topicId}
            >
              Curtir
            </LikeButtonComponent>
          </TopicBody>

          <CommentsSection>
            <Commentbox topicId={topic.id} />
          </CommentsSection>

          <AnswersBody>
            <h3>Melhor resposta</h3>
            {bestComment && <SingleAnswer best payload={bestComment} />}
            <h3>Outras respostas</h3>
            <AnswersList>
              {topic.commentsCount > 0 &&
                topic.comments.map(comment => (
                  <SingleAnswer key={comment.id} payload={comment} />
                ))}
            </AnswersList>
          </AnswersBody>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default Topic;
