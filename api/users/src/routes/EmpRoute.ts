import express from 'express';
import * as jwt from 'jsonwebtoken';
import serv from '../services/Memploi/EmpService';
import { protect, protectEnt } from '../../../../common/keycloak/AuthMiddleware';


export const empRoute = express.Router();

empRoute.post('/add', [ protect(jwt, process.env.PUBLIC_KEY + ""), protectEnt(jwt, process.env.PUBLIC_KEY + "")], serv.add);