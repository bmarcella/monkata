import express from 'express';
import * as jwt from 'jsonwebtoken';
import serv from '../services/Memploi/UnityService';
import { protect, protectEnt } from '../../../../common/keycloak/AuthMiddleware';


export const unityRoute = express.Router();

unityRoute.get('/all', [ protect(jwt, process.env.PUBLIC_KEY + ""), protectEnt(jwt, process.env.PUBLIC_KEY + "")], serv.all);
unityRoute.post('/add', [ protect(jwt, process.env.PUBLIC_KEY + ""), protectEnt(jwt, process.env.PUBLIC_KEY + "")], serv.add);
unityRoute.get('/allPostes',[ protect(jwt, process.env.PUBLIC_KEY + ""), protectEnt(jwt, process.env.PUBLIC_KEY + "")], serv.allPoste);