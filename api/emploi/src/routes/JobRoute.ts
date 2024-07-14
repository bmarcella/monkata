import axios from 'axios';
import express from 'express';
import * as jwt from 'jsonwebtoken';

import { ReCaptcha } from '../../../../common/index/ReCaptcha';
import { protect } from '../../../../common/keycloak/AuthMiddleware';
import services from '../services/JobService';

export const jobRoute = express.Router();
const ctrl = services
jobRoute.post('/add',  [ protect(jwt,process.env.PUBLIC_KEY+""),  ReCaptcha(axios) ],  ctrl.add);
jobRoute.post('/edit/:id',  protect(jwt,process.env.PUBLIC_KEY+""),  ctrl.edit);
jobRoute.get('/getJobById/:id',  ctrl.getJobById);
jobRoute.get('/getAll',  ctrl.getAll);
jobRoute.get('/getEntById/:id',  ctrl.getEntById);
jobRoute.get('/getJobForHomePage',  ctrl.getJobForHomePage);
jobRoute.get('/getJobs',  ctrl.getJobs);
jobRoute.post('/getJobsFilter/:page',  ctrl.getJobsFilter);
jobRoute.post('/getJobsFilterSearch', ctrl.getJobsFilterSearch);
jobRoute.get('/getJobByIdEnt/:id/:page',  ctrl.getJobByIdEnt);
jobRoute.get('/getMyJob/:id', protect(jwt,process.env.PUBLIC_KEY+""), ctrl.getMyJob);
jobRoute.get('/getJobByIdEntNoPage/:id',  ctrl.getJobByIdEntNoPage);
jobRoute.get('/getPostByIdJob/:id/:state/:page',  ctrl.getPostByIdJob);
jobRoute.post('/changeState',  ctrl.changeState);


jobRoute.get('/countEntAndJob', protect(jwt,process.env.PUBLIC_KEY+""),  ctrl.countEntAndJob);
//countEntAndJob

jobRoute.get('/count', protect(jwt,process.env.PUBLIC_KEY+""),  ctrl.count);
//countEntAndJob

jobRoute.get('/mail',  ctrl.mail);

jobRoute.get('/report/:id',protect(jwt,process.env.PUBLIC_KEY+""),  ctrl.report);