import express from 'express';
import { userRoute } from './UserRoute';
import { catRoute } from './CategorieRoute';
import { ctRoute } from './CTRoute';
import { entRoute } from './EntRoute';
import { roleRoute } from './RoleRoute';
export const routes = express.Router();

routes.use('/auth', userRoute);
routes.use('/categories', catRoute);
routes.use('/cross-token', ctRoute);
routes.use('/entreprise', entRoute);
routes.use('/role',roleRoute );