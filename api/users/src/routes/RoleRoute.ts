import express from 'express';

import serv from '../services/RoleService';

export const roleRoute = express.Router();

roleRoute.get('/', serv.home);
roleRoute.get('/initPermissions', serv.initPermissions);