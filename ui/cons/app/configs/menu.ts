import C_Job  from '../routes/memploi/jobs/C_Job';


import { Album, Building2, CalendarFold, Cog, CreditCard, Dock, FileUser, GitPullRequest, HandCoins, Home, LayoutDashboard, Paperclip, ScrollText, User, Users, type LucideIcon } from "lucide-react";
import PageEmployee from "~/routes/memploi/employee/page";


export type subMenu = {
name: string;
url: string;
icon?: any;
tabs ? : Tabs[];
prefix?: string;
subMenu?: subMenu[];
};

export type menu = {
  name: string;
  icon: any;
  url: string;
  isOpen?: boolean;
  prefix?: string;
  submenu?: subMenu[];
};

export type Tabs  = { 
  id : string;
  name: string;
  icon: LucideIcon ;
  component: any;
  isOpen?: boolean;
  subtabs?: Tabs[];
}




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
  "prefix": "/dashboard/memploi",
  "submenu": [
    { 
      "name": "Recruitment", 
      "url": "/recruitment",
      "icon": FileUser,
      "tabs": [
        { "id": "jobs", "name": "Jobs", "icon": FileUser , "component": C_Job },
        { "id": "overview", "name": "Overview", "component": C_Job },
        { "id": "professionals", "name": "Professionals", "component": C_Job  },
        { "id": "candidates", "name": "Candidates" , "component": C_Job },
        { "id": "interviews", "name": "Interviews" , "icon": FileUser , "component": C_Job },
        { "id": "offers", "name": "Offers",  "icon": FileUser , "component": C_Job },
        { "id": "settings", "name": "Settings",  "icon": FileUser , "component": C_Job }
      ]
    },
    { "name": "Employees",
       "url":"/employees",
       "icon": Users , 
       "tabs": [
        { "id": "Employée", "name": "Jobs", "icon": FileUser , "component": PageEmployee },
        { "id": "overview", "name": "Overview", "component": C_Job },
        { "id": "professionals", "name": "Professionals", "component": C_Job  },
        { "id": "candidates", "name": "Candidates" , "component": C_Job },
        { "id": "interviews", "name": "Interviews" , "icon": FileUser , "component": C_Job },
        { "id": "offers", "name": "Offers",  "icon": FileUser , "component": C_Job },
        { "id": "settings", "name": "Settings",  "icon": FileUser , "component": C_Job }
      ]
    },
    { 
      "name": "Attendance",
       "url": "/attendance",
      "icon": CalendarFold,
      "tabs": [
        { "id": "jobs", "name": "Jobs", "icon": FileUser , "component": C_Job },
        { "id": "overview", "name": "Overview", "component": C_Job },
        { "id": "professionals", "name": "Professionals", "component": C_Job  },
        { "id": "candidates", "name": "Candidates" , "component": C_Job },
        { "id": "interviews", "name": "Interviews" , "icon": FileUser , "component": C_Job },
        { "id": "offers", "name": "Offers",  "icon": FileUser , "component": C_Job },
        { "id": "settings", "name": "Settings",  "icon": FileUser , "component": C_Job }
      ]
     },
    { "name": "Requests", "url": "/requests", "icon": GitPullRequest,
      "tabs": [
        { "id": "jobs", "name": "Jobs", "icon": FileUser , "component": C_Job },
        { "id": "overview", "name": "Overview", "component": C_Job },
        { "id": "professionals", "name": "Professionals", "component": C_Job  },
        { "id": "candidates", "name": "Candidates" , "component": C_Job },
        { "id": "interviews", "name": "Interviews" , "icon": FileUser , "component": C_Job },
        { "id": "offers", "name": "Offers",  "icon": FileUser , "component": C_Job },
        { "id": "settings", "name": "Settings",  "icon": FileUser , "component": C_Job }
      ]
     },
    { "name": "Payroll", "url": "/payroll", "icon": HandCoins ,
      "tabs": [
        { "id": "jobs", "name": "Jobs", "icon": FileUser , "component": C_Job },
        { "id": "overview", "name": "Overview", "component": C_Job },
        { "id": "professionals", "name": "Professionals", "component": C_Job  },
        { "id": "candidates", "name": "Candidates" , "component": C_Job },
        { "id": "interviews", "name": "Interviews" , "icon": FileUser , "component": C_Job },
        { "id": "offers", "name": "Offers",  "icon": FileUser , "component": C_Job },
        { "id": "settings", "name": "Settings",  "icon": FileUser , "component": C_Job }
      ]
    },
    { "name": "Materials", "url": "/materials", "icon": HandCoins,
      "tabs": [
        { "id": "jobs", "name": "Jobs", "icon": FileUser , "component": C_Job },
        { "id": "overview", "name": "Overview", "component": C_Job },
        { "id": "professionals", "name": "Professionals", "component": C_Job  },
        { "id": "candidates", "name": "Candidates" , "component": C_Job },
        { "id": "interviews", "name": "Interviews" , "icon": FileUser , "component": C_Job },
        { "id": "offers", "name": "Offers",  "icon": FileUser , "component": C_Job },
        { "id": "settings", "name": "Settings",  "icon": FileUser , "component": C_Job }
      ]
     },
    { "name": "Legal", "url": "/legal", ScrollText,
      "tabs": [
        { "id": "jobs", "name": "Jobs", "icon": FileUser , "component": C_Job },
        { "id": "overview", "name": "Overview", "component": C_Job },
        { "id": "professionals", "name": "Professionals", "component": C_Job  },
        { "id": "candidates", "name": "Candidates" , "component": C_Job },
        { "id": "interviews", "name": "Interviews" , "icon": FileUser , "component": C_Job },
        { "id": "offers", "name": "Offers",  "icon": FileUser , "component": C_Job },
        { "id": "settings", "name": "Settings",  "icon": FileUser , "component": C_Job }
      ]
     },
    { "name": "Documents", "url": "/documents", "icon": Paperclip,
      "tabs": [
        { "id": "jobs", "name": "Jobs", "icon": FileUser , "component": C_Job },
        { "id": "overview", "name": "Overview", "component": C_Job },
        { "id": "professionals", "name": "Professionals", "component": C_Job  },
        { "id": "candidates", "name": "Candidates" , "component": C_Job },
        { "id": "interviews", "name": "Interviews" , "icon": FileUser , "component": C_Job },
        { "id": "offers", "name": "Offers",  "icon": FileUser , "component": C_Job },
        { "id": "settings", "name": "Settings",  "icon": FileUser , "component": C_Job }
      ]
     },
    { "name": "Configurations", "url": "/configurations", "icon": Cog ,
      "tabs": [
        { "id": "jobs", "name": "Jobs", "icon": FileUser , "component": C_Job },
        { "id": "overview", "name": "Overview", "component": C_Job },
        { "id": "professionals", "name": "Professionals", "component": C_Job  },
        { "id": "candidates", "name": "Candidates" , "component": C_Job },
        { "id": "interviews", "name": "Interviews" , "icon": FileUser , "component": C_Job },
        { "id": "offers", "name": "Offers",  "icon": FileUser , "component": C_Job },
        { "id": "settings", "name": "Settings",  "icon": FileUser , "component": C_Job }
      ]
    },
  ]
};