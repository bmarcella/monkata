import * as jwt from 'jsonwebtoken';
import {  protect, protectEnt } from '../../../../common/keycloak/AuthMiddleware';
export  const  PROTECT_ENTANDUSER = [protect(jwt,process.env.PUBLIC_KEY+""), protectEnt(jwt,process.env.PUBLIC_KEY+"")];

export  const  PROTECT_USER = [protect(jwt,process.env.PUBLIC_KEY+"")];