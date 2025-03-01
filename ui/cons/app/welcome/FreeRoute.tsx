import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useAuthEnt } from '~/providers/AuthEntProvider';


const FreeRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const { isAuthenticatedEnt } = useAuthEnt();

     if (isAuthenticated && isAuthenticatedEnt)
            return <Navigate to="/dashboard"  /> 

     if (isAuthenticated)  
           return <Navigate to="/compagny"  /> 
       
        return (<><Outlet /></>) ;

};

export default FreeRoute;
