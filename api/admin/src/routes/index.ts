import express from 'express';
import { userRoute } from './UserRoute';

export const routes = express.Router();

routes.use('/cv', userRoute);