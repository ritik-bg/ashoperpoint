import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await fetch('http://localhost:5173/cart', {
                    method: 'GET',
                headers: { 'Content-Type': 'application/json' } ,
                    credentials: 'include'  // To include cookies
                   
                });

                if (res.status === 401) {
                    navigate('/signin');
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                navigate('/signin');
            }
        };

        verifyUser();
    }, [navigate]);

    if (isAuthenticated === null) return <h2>Loading...</h2>; // Show a loader

    return children;
};

export default Protected;