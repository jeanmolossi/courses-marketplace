import React, { useEffect, useState } from 'react';

import api from '@shared/services/api';

import { Container, VideoHeader, VideoContainer } from './styles';
import VideoComponent from './VideoComponent';

interface Comments {
  id: string;
  userId: string;
  comment: string;
  created_at: string;
  formattedDate: string;
}

interface Likes {
  id: string;
  userId: string;
}

interface EngagementLesson {
  likes: Likes[];
  comments: Comments[];
}

interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  lessonVideo: string;
  engagement: EngagementLesson;
}

const VideoPlayer: React.FC = () => {
  const lessonId = 3;

  const [lesson, setLesson] = useState({} as Lesson);

  useEffect(() => {
    api.get(`lessons/${lessonId}`).then(response => {
      console.log(response.data);
      setLesson(response.data);
    });
  }, []);

  return (
    <Container>
      <VideoHeader>{lesson.title}</VideoHeader>
      <VideoContainer>
        <VideoComponent videoSource={lesson.lessonVideo} />
      </VideoContainer>
    </Container>
  );
};

export default VideoPlayer;
