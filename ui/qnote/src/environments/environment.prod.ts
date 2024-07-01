
import http from  '../assets/http.json';
const prod = http.prod;
const qt = http.qnEndpoint;
export const port = http.port;
export const token = http.token;
export const setting = http;
export const getQNUrl = () => (!prod) ? http.qnEndpoint  :  http.qn;

export const envQNote = {
  production: prod,
  endpoint: getQNUrl(),
  API_KEY : http.api_key
};

// pw M~%YqId416C5
