import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { useAuthEnt } from '../AuthEntProvider';

const PrivateRouteUser: React.FC = () => {

    const { isAuthenticated } = useAuth();
    const { isAuthenticatedEnt } = useAuthEnt();


     if (!isAuthenticated ) {
       return  <Navigate to="/auth"  />
     }
     if (isAuthenticatedEnt) {
       return  <Navigate to="/dashboard" />
     }

    return  <Outlet />  ;
};

export default PrivateRouteUser;
