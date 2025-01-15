
export const sessionName = {
  NAME: 'NAME_SCHOOL',
  IMG: 'SCHOOL_IMG'
};

import http from './http.json';
const prod = http.prod;
// const qt = http.qnEndpoint;
export const port = http.port;
export const host = 'localhost';
export const token = http.token;
export const setting = http;
// tslint:disable-next-line:max-line-length
export const getUrl = (name) => {
  if (prod) {
    return 'https://' + name + '.' + http.endpoint;
  } else {
    return 'http://' + name + ':' + port + '/api/';
  }
};
// tslint:disable-next-line:prefer-const
let url = () => {
  let nom = host;
  if (prod) {
      nom = localStorage.getItem('url_backend');
  }
  return nom;
};

function web() {
  let nom = host;
  if (prod) {
    nom = localStorage.getItem('url_backend');
    return 'https://' + nom + '.' + http.endpoint;
  } else {
    return 'http://' + nom + ':' + port + '/api/';
  }
}

// tslint:disable-next-line:arrow-return-shorthand
export const getPocUrl = () => { return (!prod) ? 'http://localhost:82/eclass/public/' : http.endPlk; };
// const name = sessionStorage.getItem('url_backend');
// **** DONT NOT FORGET TO SET "PRODUCTION" TO "TRUE" ***///
export const environment = {
  production: prod,
  node: false,
  host: url(),
  poc: getPocUrl(),
  apiUrl: web(),
  resUrl: 'https://' + url() + '.herokuapp.com/assets/imgs/',
};


