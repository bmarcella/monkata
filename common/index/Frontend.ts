
export type ServiceApp = { img?: string, name: string, path: string, frontend_prod?: string, frontend_dev?: string, login?: string, show?: boolean, titre?: string, description?: string };
export type ServiceObjApp = { [key: string]: ServiceApp };
export const servicesApp: ServiceObjApp = {
  auth: {
    name: "auth-monkata",
    path: "/users",
    frontend_dev: "http://localhost:4203",
    frontend_prod: "https://auth.monkata.com",
    show: false,
    login: "/auth/login-cross-token"
  },
  monkata: {
    name: "monkata",
    path: "/ecomerce",
    frontend_dev: 'http://localhost:4200',
    frontend_prod: "https://monkata.com",
    show: false,
  },
  qnote: {
    name: "qnote",
    titre: "Qnote",
    description: "Génerateur de bulletin scolaire",
    path: "/qnote",
    frontend_dev: "http://localhost:4205",
    frontend_prod: "https://qnote.pledika.com",
    login: "/auth/login-cross-token",
    show: false,
    img: 'assets/img/icons/category-5.svg',
  },
  admin: {
    name: "admin",
    titre: "Admin",
    description: "Monkata Admin",
    path: "/admin",
    frontend_dev: "http://localhost:4206",
    frontend_prod: "https://admin.monkata.com",
    login: "/auth/login-cross-token",
    show: false,
    img: 'assets/img/icons/category-5.svg',
  },
  memploi: {
    name: "memploi",
    titre: "Memploi",
    description: "Trouver un emploi qui vous convient!",
    path: "/jobs",
    frontend_dev: "http://localhost:4201",
    frontend_prod: "https://memploi.com",
    login: "/auth/login-cross-token",
    show: true,
    img: 'assets/img/logo_2.png',
  },
  pledika: {
    name: "Pledika",
    titre: "Pledika",
    description: "Pour les etablissements scolaires",
    path: "/jobs",
    frontend_dev: "http://localhost:4201",
    frontend_prod: "https://www.pledika.com",
    show: false,
    img: 'assets/img/logo_2.png',
  },
};