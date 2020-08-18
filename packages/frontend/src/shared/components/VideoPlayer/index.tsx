import React, { useEffect, useState } from 'react';

import api from '@shared/services/api';

import { useParams } from 'react-router-dom';
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
  videoURL: string;
  engagement: EngagementLesson;
}

const VideoPlayer: React.FC = () => {
  const { moduleId, lessonId } = useParams();

  const [lesson, setLesson] = useState({} as Lesson);

  useEffect(() => {
    api.get(`lessons/index/${lessonId}`).then(response => {
      console.log(response.data, '>> RESPONSE OF LESSONS');
      setLesson(response.data);
    });
  }, [moduleId, lessonId]);

  return (
    <Container>
      <VideoHeader>{lesson.title}</VideoHeader>
      <VideoContainer>
        <VideoComponent videoSource={lesson.videoURL} />
      </VideoContainer>
    </Container>
  );
};

export default VideoPlayer;
