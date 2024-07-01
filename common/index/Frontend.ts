
export type ServiceApp = { img?: string, name: string, path: string, frontend_prod?: string, frontend_dev?: string, login?: string, show?: boolean, titre?: string, description?: string };
export type ServiceObjApp = { [key: string]: ServiceApp };
export const servicesApp: ServiceObjApp = {
  auth: {
    name: "auth-monkata",
    path: "/jobs",
    frontend_dev: "http://localhost:4203",
    show: false,
    login: "/auth/login-cross-token"
  },
  monkata: {
    name: "monkata",
    path: "/ecomerce",
    frontend_dev: 'http://localhost:4200',
    show: false,
  },
  qnote: {
    name: "qnote",
    titre: "Qnote",
    description: "Génerateur de bulletin scolaire",
    path: "/qnote",
    frontend_dev: "http://localhost:4205",
    login: "/auth/login-cross-token",
    show: true,
    img: 'assets/img/icons/category-5.svg',
  },
  admin: {
    name: "admin",
    titre: "Admin",
    description: "Monkata Admin",
    path: "/admin",
    frontend_dev: "http://localhost:4206",
    login: "/auth/login-cross-token",
    show: true,
    img: 'assets/img/icons/category-5.svg',
  },
  memploi: {
    name: "memploi",
    titre: "Memploi",
    description: "Trouver un emploi qui vous convient!",
    path: "/jobs",
    frontend_dev: "http://localhost:4201",
    login: "/auth/login-cross-token",
    show: true,
    img: 'assets/img/icons/category-5.svg',
  },
  pledika: {
    name: "Pledika",
    titre: "Pledika",
    description: "Pour les etablissements scolaires",
    path: "/jobs",
    frontend_dev: "http://localhost:4201",
    show: true,
    img: 'assets/img/icons/category-6.svg',
  },
};