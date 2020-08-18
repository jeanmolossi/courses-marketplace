import { Router } from 'express';

import likesRoutes from './likes.routes';
import commentsRoutes from './comments.routes';
import nestedCommentsRoutes from './nestedComments.routes';
import votesRoutes from './votes.routes';

const engagementModuleRoutes = Router();

engagementModuleRoutes.use('/comments', commentsRoutes);
engagementModuleRoutes.use('/likes', likesRoutes);
engagementModuleRoutes.use('/nestedcomments', nestedCommentsRoutes);
engagementModuleRoutes.use('/votes', votesRoutes);

export default engagementModuleRoutes;
