import React, { useState, useEffect, useCallback } from 'react';
import {
  FiTerminal,
  FiCircle,
  FiCheckCircle,
  FiPlayCircle,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

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

  const videoId = '2';

  const handleMarkAsCompleteLesson = useCallback(async lessonId => {
    // eslint-disable-next-line no-console
    console.log(`Lesson ${lessonId} is ready to update`);
  }, []);

  useEffect(() => {
    setLoadingModules(true);
    api.get(`modules`).then(async moduleResponse => {
      const { data: lessonsResponse } = await api.get<Lesson[]>(`lessons`);

      const { data: lessonsProgress } = await api.get<LessonProgressData[]>(
        `usersProgress`,
        {
          params: { userId: user.id },
        },
      );

      const lessonsData: Lesson[] = lessonsResponse.map((lesson: Lesson) => {
        const lessonProgressFound = lessonsProgress[0].lessonsProgress.find(
          l => l.id === lesson.id,
        );

        let status = 'Incomplete';
        if (lessonProgressFound && lessonProgressFound.progress === 100)
          status = 'Complete';

        if (lessonProgressFound && lessonProgressFound.lesson === videoId)
          status = 'Watching';

        return {
          ...lesson,
          status,
        } as Lesson;
      });

      const modulesData = moduleResponse.data.map((module: Module) => {
        const lessonsOfModule = lessonsData.filter(
          l => l.moduleId === module.id,
        );

        let lessons: Lesson[] = [];
        if (lessonsOfModule) lessons = lessonsOfModule;
        return {
          ...module,
          lessons,
        };
      });

      setModules(modulesData);
      setLoadingModules(false);
    });
  }, [user.id]);

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
                    <Link to="/aulas/backend/1">{lesson.title}</Link>
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
