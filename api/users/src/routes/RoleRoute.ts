import express from 'express';

import serv from '../services/RoleService';

import * as jwt from 'jsonwebtoken';

import { protect, protectEnt } from '../../../../common/keycloak/AuthMiddleware';

export const roleRoute = express.Router();

roleRoute.get('/initPermissions', serv.initPermissions);
roleRoute.get('/all', serv.all);
roleRoute.get('/getUserRole/:page', [ protect(jwt, process.env.PUBLIC_KEY + ""), protectEnt(jwt, process.env.PUBLIC_KEY + "")], serv.getUserRole);
