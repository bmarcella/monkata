import { DeployType } from '../../../../common/deploy/index';
import {
  ReCaptchaPublicKey,
  ServiceObj,
  services as service_name,
} from '../../../../common/index/services';

const getService = (): ServiceObj => {
  const s: ServiceObj = {};
  service_name.forEach(element => {
    s[element.name] = element;
  });
  return s;
}
const services = getService();
const live = false;
const prod = DeployType.prod;
const url = {
  live :'http://69.159.138.245:3000' ,
  dev:"http://localhost:3000",
  prod:"https://gateway.memploi.com"
}
const local = (prod) ? "prod" : (live) ? "live" : "dev";
export const environment = {
  production: prod,
  gateway: url[local],
  services,
  recaptcha: {
    siteKey: ReCaptchaPublicKey ,
  },
};

export const getURL = (service: string, endpoint: string) => {
  return `${environment.gateway}${environment.services[service].path}/${endpoint}`;
}

export const getRURL = (ct: any, auth: any) => {
  const token = ct.token;
  return (!prod) ? `${auth.frontend_dev}${auth.login}/${token}` : `${auth.frontend_prod}${auth.login}/${token}`;
}
