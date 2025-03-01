import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthEnt } from "../../providers/AuthEntProvider";

const PrivateRouteEnt: React.FC = () => {
    const { isAuthenticatedEnt } = useAuthEnt();


    if (!isAuthenticatedEnt) {
        return <Navigate to="/compagny"  />;
    }

    return <Outlet />;
};

export default PrivateRouteEnt;