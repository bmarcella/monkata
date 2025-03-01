import express from 'express';
import { userRoute } from './UserRoute';
import { catRoute } from './CategorieRoute';
import { ctRoute } from './CTRoute';
import { entRoute } from './EntRoute';
import { roleRoute } from './RoleRoute';
import { unityRoute } from './UnityRoute';
import { empRoute } from './EmpRoute';
export const routes = express.Router();

routes.use('/auth', userRoute);
routes.use('/categories', catRoute);
routes.use('/cross-token', ctRoute);
routes.use('/entreprise', entRoute);
routes.use('/role',roleRoute );
routes.use('/unity',unityRoute );
routes.use('/employee',empRoute );