import { container } from 'tsyringe';

import INestedCommentsRepository from '../repositories/INestedCommentsRepository';
import NestedCommentsRepository from '../infra/typeorm/repositories/NestedCommentsRepository';

import ICommentsRepository from '../repositories/ICommentsRepository';
import CommentsRepository from '../infra/typeorm/repositories/CommentsRepository';

import ILikeRepository from '../repositories/ILikeRepository';
import LikeRepository from '../infra/typeorm/repositories/LikeRepository';

import IVoteRepository from '../repositories/IVoteRepository';
import VotesRepository from '../infra/typeorm/repositories/VoteRepository';

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository,
);
container.registerSingleton<ILikeRepository>('LikeRepository', LikeRepository);
container.registerSingleton<INestedCommentsRepository>(
  'NestedCommentsRepository',
  NestedCommentsRepository,
);
container.registerSingleton<IVoteRepository>(
  'VotesRepository',
  VotesRepository,
);
