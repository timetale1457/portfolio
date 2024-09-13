import { Router, Request, Response } from 'express';
import testRouter from './test';
import authRouter from './auth';

const v1_router = Router();

v1_router.use('/auth', authRouter);
// v1_router.use('/test', testRouter);

export default v1_router;