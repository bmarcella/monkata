import express from 'express';
import { appRoute } from './AppRoute';
import { jobRoute } from './JobRoute';
import { userRoute } from './UserRoute';
export const routes = express.Router();
routes.use('/app',appRoute);
routes.use('/cv',userRoute);
routes.use('/',jobRoute);