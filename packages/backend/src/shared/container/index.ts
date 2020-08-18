import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import ModulesRepository from '@modules/modules/infra/typeorm/repositories/ModulesRepository';

import ILessonsRepository from '@modules/lessons/repositories/ILessonsRepository';
import LessonsRepository from '@modules/lessons/infra/typeorm/repositories/LessonsRepository';

import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import ClassesRepository from '@modules/classes/infra/typeorm/repositories/ClassesRepository';

import ITopicsRepository from '@modules/topics/repositories/ITopicsRepository';
import TopicsRepository from '@modules/topics/infra/typeorm/repositories/TopicsRepository';

import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import TagsRepository from '@modules/tags/infra/typeorm/repositories/TagRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import '@modules/users/providers';
import '@modules/engagement/container';
import '@shared/container/providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IModulesRepository>(
  'ModulesRepository',
  ModulesRepository,
);
container.registerSingleton<ILessonsRepository>(
  'LessonsRepository',
  LessonsRepository,
);
container.registerSingleton<IClassesRepository>(
  'ClassesRepository',
  ClassesRepository,
);
container.registerSingleton<ITopicsRepository>(
  'TopicsRepository',
  TopicsRepository,
);
container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);
container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
