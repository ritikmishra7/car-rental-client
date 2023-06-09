import React, { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";

const OnlyIfLoggedIn = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
    }, []);
    return <Outlet />;
}

export default OnlyIfLoggedIn;