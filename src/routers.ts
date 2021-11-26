import * as Express from 'express';

import { userRouter } from './components/user';

export const apiRouter = Express.Router();

apiRouter.use('/users', userRouter)
