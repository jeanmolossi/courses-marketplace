import React, { useState, useEffect } from 'react';
import DefaultLayout from '@globalComponents/_Layout/Default';
import { Link } from 'react-router-dom';

import api from '@shared/services/api';

import Yoda from '@assets/yoda.svg';

import { useAuth } from '@shared/hooks/Auth';
import MarkupParser from '@globalComponents/MarkupParser';
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
  name: string;
}

interface Topics {
  id: string;
  userId: string;
  title: string;
  description: string;
  tags: string[];
  tagsData: Tags[];
  solved?: boolean;
  engagment: {
    views: number;
    count: {
      likes: number;
      comments: number;
    };
  };
  badge?: {
    label: string;
    labelClass: string;
  };
}

const Forum: React.FC = () => {
  const [tags, setTags] = useState([] as Tags[]);
  const [topics, setTopics] = useState([] as Topics[]);

  const [filterTopics, setFilterTopics] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    api.get<Tags[]>(`tags`).then(response => {
      setTags(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Topics[]>(`topics`).then(response => {
      const topicsData = response.data.map(topic => {
        const topicTags = tags.filter(tag => topic.tags.includes(tag.id));

        return {
          ...topic,
          tagsData: topicTags || [],
        };
      });

      let filter: Topics[] = topicsData;

      if (filterTopics !== '') {
        switch (filterTopics) {
          case 'solved': {
            filter = topicsData.filter(t => t.solved === true);
            break;
          }
          case 'mytopics': {
            filter = topicsData.filter(t => t.userId === user.id);
            break;
          }
          case 'notsolvedyet': {
            filter = topicsData.filter(t => t.solved !== true);
            break;
          }
          default: {
            filter = topicsData;
            break;
          }
        }
      }
      console.log(filter);
      setTopics(filter);
    });
  }, [tags, filterTopics, user.id]);

  return (
    <DefaultLayout>
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
            <FilterButton onClick={() => setFilterTopics('')}>
              Todos
            </FilterButton>
            <FilterButton onClick={() => setFilterTopics('mytopics')}>
              Meus tópicos
            </FilterButton>
            <FilterButton onClick={() => setFilterTopics('solved')}>
              Resolvidos
            </FilterButton>
            <FilterButton onClick={() => setFilterTopics('notsolvedyet')}>
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
                  <h2>
                    <Link to={`topic/${topic.id}`}>{topic.title}</Link>
                  </h2>
                  <p>
                    <MarkupParser
                      source={`${topic.description.slice(
                        0,
                        180,
                      )}... Continue lendo`}
                    />
                  </p>
                  <Engagment>
                    <li>{topic.engagment.count.comments || 0} respostas</li>
                    <li>{topic.engagment.count.likes || 0} curtidas</li>
                    <li>{topic.engagment.views || 0} visualizações</li>
                  </Engagment>
                </MainContentTopic>
                <Tags>
                  <h2>Tags</h2>
                  <ul>
                    {topic.tagsData.map(tag => (
                      <li key={tag.id}>
                        <a href="#/">{tag.name}</a>
                      </li>
                    ))}
                  </ul>
                </Tags>
              </SingleTopic>
            ))}
          </ForumTopics>
        </Content>
      </Container>
    </DefaultLayout>
  );
};

export default Forum;
