import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthEnt } from '../AuthEntProvider';
import { Services } from '~/services/Http';

const PrivateRouteEmploi: React.FC = () => {
    const { isApp } = useAuthEnt() || {};
    
    if (!isApp(Services.MEMPLOI)) 
        return <Navigate to="/compagny"   replace />;

    return  <Outlet />
};

export default PrivateRouteEmploi;
