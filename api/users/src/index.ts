import 'reflect-metadata';

import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { Eureka } from 'eureka-js-client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, {
  Express,
  NextFunction,
  Request,
  Response,
} from 'express';
import session from 'express-session';
import { JwtPayload } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { DataSource } from 'typeorm';

import { AppDataSource } from '../../../common/db/data-source';
import {
  EurekaTools,
  Run,
} from '../../../common/eureka/Eureka';
import { Mail } from '../../../common/mail';
import { Adresse } from './entity/Adresse';
import { Application } from './entity/Application';
import { Avatar } from './entity/Avatar';
import { Categorie } from './entity/Categorie';
import { CrossToken } from './entity/CrossToken';
import { Entreprise } from './entity/Entreprise';
import { Logo } from './entity/Logo';
import { ServiceEnt } from './entity/ServiceEnt';
import { User } from './entity/User';
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

const entities = [User,Adresse, Entreprise, Categorie, ServiceEnt, Application, Avatar, CrossToken, Logo];

AppDataSource<DataSource, Array<any>>(DataSource, process.env, entities).then((DB: DataSource) => {

  const app: Express = express();
  app.use(cors());
  app.use(session({
    secret: (process.env.SESSION_SECRET + "")?.trim(),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
  const ET = EurekaTools<Eureka>(Eureka, process.env);

  app.use((req: Request, res: Response, next: NextFunction) => {
    req.EurekaClient = ET.EurekaClient
    req.DB = DB;
    req.mail = new Mail(nodemailer, "admin", "Mab@0828@2024;");
    next();
  })
  // body-parser
  app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use('/users', routes);
  Run(process.env, ET, app);

})
  .catch((error) => console.log(error));



