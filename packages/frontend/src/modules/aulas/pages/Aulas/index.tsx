import React from 'react';

import DefaultLayout from '@gComponents/_Layout/Default';

import Sidebar from '@modules/aulas/components/Sidebar';
import VideoPlayer from '@gComponents/VideoPlayer';

import CommentInVideo from '@modules/aulas/components/CommentInVideo';
import LessonComments from '@modules/aulas/components/LessonComments';

import { Container, Content } from './styles';

const Aulas: React.FC = () => {
  return (
    <DefaultLayout>
      <Container>
        <Sidebar />
        <Content>
          <VideoPlayer />
          <CommentInVideo />
          <LessonComments />
        </Content>

        <div style={{ clear: 'both' }} />
      </Container>
    </DefaultLayout>
  );
};

export default Aulas;
