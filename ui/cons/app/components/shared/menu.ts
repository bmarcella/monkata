import { Album, Building2, CalendarFold, Cog, CreditCard, Dock, FileUser, GitPullRequest, HandCoins, Home, LayoutDashboard, Paperclip, ScrollText, User, Users } from "lucide-react";


export type subMenu = {
name: string;
url: string;
icon?: any;
};

export type menu = {
name: string;
icon: any;
url: string;
isOpen?: boolean;
submenu?: subMenu[];
};



export const menuConfig = {
  "menus": [
    {
      "name": "Monkata",
      "icon": Home,
       isOpen: false,
      "submenu": [
        { "name": "Dashboard", "url": "/dashboard", "icon": LayoutDashboard, },
        { "name": "Companies", "url": "/dashboard/entreprises", "icon": Building2, },
        { "name": "Apps", "url": "/dashboard/apps", "icon": Dock, },
        { "name": "Plans", "url": "/dashboard/plans" , "icon": CreditCard,},
        { "name": "Configurations", "url": "/dashboard/configurations", "icon": Cog, },
      ]
    },
  ]
};

 export const  RHManaMenu = {
  "name": "Memploi RH",
  "icon":  Album,
  "submenu": [
    { 
      "name": "Recruitment", 
      "url": "/memploi/recruitment",
      "icon": FileUser,
      "tabs": [
        { "id": "overview", "name": "Overview" },
        { "id": "professionals", "name": "Professionals" },
        { "id": "jobs", "name": "Jobs" },
        { "id": "candidates", "name": "Candidates" },
        { "id": "interviews", "name": "Interviews" },
        { "id": "offers", "name": "Offers" },
        { "id": "settings", "name": "Settings" }
      ]
    },
    { "name": "Employees", "url": "/memploi/employees", "icon": Users },
    { "name": "Attendance", "url": "/memploi/attendance", "icon": CalendarFold },
    { "name": "Requests", "url": "/memploi/requests", "icon": GitPullRequest },
    { "name": "Payroll", "url": "/memploi/payroll", "icon": HandCoins },
    { "name": "Materials", "url": "/memploi/materials", "icon": HandCoins },
    { "name": "Legal", "url": "/memploi/legal", ScrollText },
    { "name": "Documents", "url": "/memploi/documents", "icon": Paperclip },
    { "name": "Configurations", "url": "/memploi/configurations", "icon": Cog },
  ]
};