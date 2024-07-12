import {
  ReCaptchaPublicKey,
  ServiceObj,
  services as service_name,
} from '../../../../common/index/services';
import keycloakConfig from './keycloak.config';

const getService = (): ServiceObj => {
  const s: ServiceObj = {};
  service_name.forEach(element => {
    s[element.name] = element;
  });
  return s;
}
const services = getService();
const live = false;
const prod = false;
const url = {
  live : 'http://69.159.138.245:3000' ,
  dev:  "http://localhost:3000",
  prod: "http://209.38.48.97:3000"
}
const local = (prod) ? "prod" : (live) ? "live" : "dev";
export const environment = {
  production: prod,
  gateway: url[local],
  services,
  keycloak: keycloakConfig,
  recaptcha: {
    siteKey: ReCaptchaPublicKey ,
  },
};
export const getURL = (service: string, endpoint: string) => {
  return `${environment.gateway}${environment.services[service].path}/${endpoint}`;
}
export const gWURL = (endpoint: string) => {
  return `${environment.gateway}/${endpoint}`;
}

export const getRURL = (ct: any, auth: any) => {
  const token = ct.token;
  return (!prod) ? `${auth.frontend_dev}${auth.login}/${token}` : `${auth.frontend_prod}${auth.login}/${token}`;
}

