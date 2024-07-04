import cors from 'cors';
import dotenv from 'dotenv';
import { Eureka } from 'eureka-js-client';
import express, { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import {
  EurekaTools,
  setProxies,
} from '../../../common/eureka/Eureka';
import { services } from '../../../common/index/services';

dotenv.config();
console.log(process.env);
const ET = EurekaTools<Eureka>(Eureka, process.env);
setProxies<Express, Eureka>(process.env, ET, express, cors, ET.EurekaClient, services, createProxyMiddleware);



