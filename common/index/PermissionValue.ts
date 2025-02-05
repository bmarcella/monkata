export  enum RHPermission {
    CAN_CHANGE_ROLE,
    CAN_CHANGE_SALARY,
    CAN_ADD_EMPLOYEE,
    CAN_UPDATE_EMPLOYEE,
    CAN_SEE_ROLE,
    CAN_CREATE_ROLE,
    CAN_CREATE_USER,
    CAN_EDIT_USER
}

export  enum ADMINPermission {
    CAN_BLOCK_USER,
}

export  enum PLEDIKAPermission {
    CAN_CHANGE_ROLE,
    CAN_ADD_STUDENT,
    CAN_UPDATE_STUDENT,
    CAN_ADD_COURSE,
    CAN_UPDATE_COURSE
}
export type PermissionService = {
    name : string,
    enum : typeof RHPermission | typeof ADMINPermission | typeof PLEDIKAPermission
};

export const  PermissionData :  PermissionService [] = [
    {
     name : "memploi",
     enum : RHPermission,
    },
    {
      name : "admin",
      enum : ADMINPermission,
    },
    {
     name: "pledika",
     enum : PLEDIKAPermission
    }
  ];
