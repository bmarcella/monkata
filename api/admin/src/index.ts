import 'reflect-metadata';

/* eslint-disable @typescript-eslint/no-explicit-any */
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { Eureka } from 'eureka-js-client';
import express, {
    Express,
    NextFunction,
    Request,
    Response,
} from 'express';
import session from 'express-session';
import nodemailer from 'nodemailer';
import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../common/db/data-source';
import {
    EurekaTools,
    Run,
} from '../../../common/eureka/Eureka';
import { JwtPayload } from '../../../common/keycloak/AuthMiddleware';
import { Mail } from '../../../common/mail/index';
import { User } from './entity/User';
import { UserRole } from './entity/UserRole';
import { routes } from './routes';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      EurekaClient?: any,
      payload?: JwtPayload,
      token?: string
      DB: any,
      mail: Mail,
    }
  }
}

dotenv.config();

const entities = [User, UserRole];
AppDataSource<DataSource, Array<any>>(DataSource, process.env, entities).then((DB: DataSource) => {
  const app: Express = express();
  app.use(cors());

  app.use(session({
    secret: (process.env.SESSION_SECRET + "")?.trim(),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Mettez à `true` dans un environnement de production avec HTTPS
  }));
  const ET = EurekaTools<Eureka>(Eureka, process.env);

  app.use((req: Request, res: Response, next: NextFunction) => {
    req.EurekaClient = ET.EurekaClient
    req.DB = DB;
    req.mail = new Mail(nodemailer, "memploi", "Mab@0828@2024;");
    next();
  })
  app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  const BP = (process.env.BASE_PATH) ? process.env.BASE_PATH + '' : '/';
  app.use(BP, routes);
  Run(process.env, ET, app);

})
  .catch((error) => console.log(error));



