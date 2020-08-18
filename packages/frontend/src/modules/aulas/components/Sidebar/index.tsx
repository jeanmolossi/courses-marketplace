import React, { useState, useEffect, useCallback } from 'react';
import {
  FiTerminal,
  FiCircle,
  FiCheckCircle,
  FiPlayCircle,
} from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

import api from '@shared/services/api';

import { useAuth } from '@shared/hooks/Auth';
import {
  Container,
  SidebarHeader,
  SidebarContent,
  SidebarModule,
  SidebarModuleHeader,
  Lesson,
} from './styles';

interface LessonsProgress {
  id: string;
  lesson: string;
  progress: number;
}

interface LessonProgressData {
  id: string;
  userId: string;
  lessonsProgress: LessonsProgress[];
}

interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  status: 'Complete' | 'Incomplete' | 'Watching';
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

const iconsOfStatus = {
  Complete: <FiCheckCircle />,
  Incomplete: <FiCircle />,
  Watching: <FiPlayCircle />,
};

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState([] as Module[]);
  const [loadingModules, setLoadingModules] = useState(true);

  const { moduleId, videoId } = useParams();

  const handleMarkAsCompleteLesson = useCallback(async lessonId => {
    // eslint-disable-next-line no-console
    console.log(`Lesson ${lessonId} is ready to update`);
  }, []);

  useEffect(() => {
    console.log(moduleId, videoId);
    setLoadingModules(true);
    api.get(`modules/show`).then(async moduleResponse => {
      setModules(moduleResponse.data);
      setLoadingModules(false);
    });
  }, [user.id, moduleId, videoId]);

  return (
    <Container className="sidebar">
      {loadingModules ? (
        <SidebarHeader>
          <h3>Carregando...</h3>
        </SidebarHeader>
      ) : (
        <>
          <SidebarHeader>
            <h1>Módulos</h1>
          </SidebarHeader>
          <SidebarContent>
            {modules.map(module => (
              <SidebarModule key={module.id}>
                <SidebarModuleHeader>
                  <FiTerminal /> <span>{module.title}</span>
                </SidebarModuleHeader>
                {module.lessons.map(lesson => (
                  <Lesson key={lesson.id} status={lesson.status}>
                    <button
                      type="button"
                      onClick={() => handleMarkAsCompleteLesson(lesson.id)}
                    >
                      {iconsOfStatus[lesson.status || 'Incomplete']}
                    </button>
                    <Link to={`/aulas/${module.id}/${lesson.id}`}>
                      {lesson.title}
                    </Link>
                  </Lesson>
                ))}
              </SidebarModule>
            ))}
          </SidebarContent>
        </>
      )}
    </Container>
  );
};

export default Sidebar;
