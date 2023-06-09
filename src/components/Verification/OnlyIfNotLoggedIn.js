import React, { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";

const OnlyIfNotLoggedIn = () => {
    const navigate = useNavigate();
    useEffect(() => {
        let token = localStorage.getItem("accessToken");
        if (token) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Outlet />
    );
};

export default OnlyIfNotLoggedIn;
