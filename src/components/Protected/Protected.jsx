import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from "react-router-dom";

const Protected = ({ children }) => {
//    const isAuth = useSelector((state)=>state)
    const navigate = useNavigate();

    // useEffect(() => {
    //     const verifyUser = async () => {
    //         try {
    //             const res = await fetch(`${Baseurl}/cart`, {
    //                 method: 'GET',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 credentials: 'include'  

    //             });

    //             if (res.status === 401) {
    //                 navigate('/signin');
    //             } else {
    //                 setIsAuthenticated(true);
    //             }
    //         } catch (error) {
    //             navigate('/signin');
    //         }
    //     };

    //     verifyUser();
    // }, [navigate]);

    if (isAuthenticated === null) return <h2>Loading...</h2>; 

    return children;
};

export default Protected;