import express from 'express';
import { userRoute } from './UserRoute';
import { jobRoute } from './JobRoute';

export const routes = express.Router();

routes.use('/cv',userRoute);
routes.use('/',jobRoute);