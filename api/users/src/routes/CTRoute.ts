import express from 'express';

import services from '../services/CTService';

export const ctRoute = express.Router();
const serv = services;
ctRoute.get('/addCT/:key', serv.addCT);
ctRoute.post('/addCT/:key', serv.addCT);
ctRoute.get('/getCT/:token', serv.getCT);
ctRoute.post('/setCT', serv.setRefreshTokenCT);
ctRoute.get('/getFullCT/:token', serv.getFullCT);
// appRoute.get('/logout/:token', protect(jwt, process.env.PUBLIC_KEY + ""), serv.addCT);
