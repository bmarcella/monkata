export type Service = { name: string, path: string, frontend_prod?: string, frontend_dev?: string };
export type ServiceObj = { [key: string]: Service };
export const services: Service[] = [
  {
    name: "users",
    path: "/users",
    frontend_dev: 'https://localhost:4203',
    frontend_prod: 'https:auth.monkata.com'
  },
  {
    name: "memploi",
    path: "/jobs",
    frontend_dev: "https://localhost:4201",
    frontend_prod: 'https://memploi.com'
  },
  {
    name: "admin",
    path: "/admin",
    frontend_dev: "https://localhost:4206",
    frontend_prod: 'https://admin.monkata.com'
  },
  {
    name: "qnote",
    path: "/qnote",
    frontend_dev: "https://localhost:4205",
    frontend_prod: 'https://qnote.pledika.com'
  },
];
export const ReCaptchaPublicKey = '6LcthfgpAAAAAHffOi3dMqD4ses5xCGIDA98HRUv';
export const getService = (name: string): Service => {
  const s: ServiceObj = {};
  services.forEach(element => {
    s[element.name] = element;
  });
  return s[name];
}

