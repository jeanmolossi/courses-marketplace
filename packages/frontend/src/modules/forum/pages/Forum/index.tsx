import React, { useState, useEffect, useCallback } from 'react';
import DefaultLayout from '@gComponents/_Layout/Default';
import { Link } from 'react-router-dom';

import api from '@shared/services/api';

import Yoda from '@assets/yoda.svg';

import { useAuth } from '@shared/hooks/Auth';
import dateFormatter from '@shared/utils/dateFormatter';
import {
  Container,
  ContainerHeader,
  YodaPlace,
  Content,
  ForumTabs,
  FilterButton,
  ForumTopics,
  SingleTopic,
  MainContentTopic,
  Engagment,
  Tags,
} from './styles';

interface Tags {
  id: string;
  tag: {
    id: string;
    name: string;
  };
}

interface Topics {
  id: string;
  userId: string;
  user: {
    name: string;
  };
  title: string;
  text: string;
  tags: Tags[];
  views: number;
  likesCount: number;
  commentsCount: number;
  badge?: {
    label: string;
    labelClass: string;
  };
  formattedDate: string;
  created_at: string;
}

interface FilterTopics {
  me?: string;
  solved?: string;
}

const Forum: React.FC = () => {
  const [topics, setTopics] = useState([] as Topics[]);
  const [filterTopics, setFilterTopics] = useState({} as FilterTopics);
  const [loadingTopics, setLoadingTopics] = useState(true);

  const { user } = useAuth();

  const loadTopics = useCallback(async () => {
    setLoadingTopics(true);

    const response = await api.get<Topics[]>(`topics/show`, {
      params: {
        ...filterTopics,
      },
    });
    const topicsData = response.data.map(topic => {
      const engagement = {
        views: 0,
        count: {
          likes: 0,
          comments: 0,
        },
      };

      return {
        ...topic,
        formattedDate: dateFormatter(topic.created_at),
        engagment: { ...engagement },
      };
    });

    setTopics(topicsData);
    setLoadingTopics(false);
  }, [filterTopics]);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  return (
    <DefaultLayout>
      {loadingTopics ? (
        <h1>Carregando...</h1>
      ) : (
        <Container>
          <ContainerHeader>
            <YodaPlace>
              <img src={Yoda} alt="Yoda! Bem vindo padawan" />
            </YodaPlace>
            <div>
              <h3>Bem vindo Padawan, ao centro que seu é, de treinamentos!</h3>
              <h3>Suas dúvidas tire, ao outros, sabiamente perguntando.</h3>
            </div>
          </ContainerHeader>
          <Content>
            <ForumTabs>
              <FilterButton onClick={() => setFilterTopics({} as FilterTopics)}>
                Todos
              </FilterButton>
              <FilterButton onClick={() => setFilterTopics({ me: user.id })}>
                Meus tópicos
              </FilterButton>
              <FilterButton onClick={() => setFilterTopics({ solved: 'true' })}>
                Resolvidos
              </FilterButton>
              <FilterButton
                onClick={() => setFilterTopics({ solved: 'false' })}
              >
                Não resolvidos
              </FilterButton>
            </ForumTabs>

            <ForumTopics>
              {topics.map(topic => (
                <SingleTopic
                  key={topic.id}
                  className={
                    topic.badge && topic.badge.label
                      ? topic.badge.labelClass
                      : 'no-label'
                  }
                  label={topic.badge && topic.badge.label}
                >
                  <MainContentTopic>
                    <Link to={`topic/${topic.id}`}>
                      <h2>{topic.title}</h2>
                      <h3>{topic.user.name}</h3>
                      <small>{topic.formattedDate}</small>
                    </Link>
                    <Engagment>
                      <li>{topic.commentsCount || 0} respostas</li>
                      <li>{topic.likesCount || 0} curtidas</li>
                      <li>{topic.views || 0} visualizações</li>
                    </Engagment>
                  </MainContentTopic>
                  <Tags>
                    <h2>Tags</h2>
                    <ul>
                      {topic.tags &&
                        topic.tags.map(tag => (
                          <li key={tag.tag.id}>
                            <a href="#/">{tag.tag.name}</a>
                          </li>
                        ))}
                    </ul>
                  </Tags>
                </SingleTopic>
              ))}
            </ForumTopics>
          </Content>
        </Container>
      )}
    </DefaultLayout>
  );
};

export default Forum;
