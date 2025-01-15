export const menuConfig = {
  "menus": [
    {
      "name": "Monkata",
      "icon": "bi-grid-fill",
      "submenus": [
        { "name": "Dashboard", "route": "/monkata/dashboard" },
        { "name": "Companies", "route": "/monkata/companies" },
        { "name": "Apps", "route": "/monkata/apps" },
        { "name": "Plans", "route": "/monkata/plans" },
        { "name": "Configurations", "route": "/monkata/configurations" }
      ]
    },
    
  ]
}

 export const  RHManaMenu = {
  "name": "Memploi RH",
  "icon": "bi-people-fill",
  "submenus": [
    { 
      "name": "Recruitment", 
      "route": "/memploi/recruitment",
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
    { "name": "Employees", "route": "/memploi/employees" },
    { "name": "Attendance", "route": "/memploi/attendance" },
    { "name": "Requests", "route": "/memploi/requests" },
    { "name": "Payroll", "route": "/memploi/payroll" },
    { "name": "Materials", "route": "/memploi/materials" },
    { "name": "Legal", "route": "/memploi/legal" },
    { "name": "Documents", "route": "/memploi/documents" },
    { "name": "Configurations", "route": "/memploi/configurations" }
  ]
};