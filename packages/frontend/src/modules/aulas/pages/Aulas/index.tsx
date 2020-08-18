import React from 'react';
import { Switch } from 'react-router-dom';

import DefaultLayout from '@gComponents/_Layout/Default';

import Sidebar from '@modules/aulas/components/Sidebar';
import VideoPlayer from '@gComponents/VideoPlayer';

// import CommentInVideo from '@modules/aulas/components/CommentInVideo';
// import LessonComments from '@modules/aulas/components/LessonComments';

import Route from '@shared/routes/Route';

import { Container, Content } from './styles';

const Aulas: React.FC = () => {
  return (
    <DefaultLayout>
      <Container>
        <Sidebar />
        <Content>
          <Switch>
            <Route
              path="/aulas/:moduleId/:lessonId"
              component={() => (
                <>
                  <VideoPlayer />
                  {/* <CommentInVideo /> */}
                  {/* <LessonComments /> */}
                </>
              )}
              isPrivate
            />
          </Switch>
        </Content>

        <div style={{ clear: 'both' }} />
      </Container>
    </DefaultLayout>
  );
};

export default Aulas;
