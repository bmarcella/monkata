import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { useAuthEnt } from '../../providers/AuthEntProvider';


const PrivateRouteUser: React.FC = ( { children } : { children: React.ReactNode}) => {

    const { isAuthenticated } = useAuth();
    const { isAuthenticatedEnt } = useAuthEnt();

     if (!isAuthenticated ) {
      return  <Navigate to="/auth"  />
     }

     if (isAuthenticated && isAuthenticatedEnt) {
        return  <Navigate to="/dashboard" />
     }
     
       
     return   { }  ;
     
};

export default PrivateRouteUser;
