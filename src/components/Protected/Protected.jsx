import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const Protected = ({ Component }) => {
    const isAuth = useSelector((state) => state.auth.token);

    if (!isAuth) { return <Navigate to={'/login'} /> } else {
        return <Component />;
    }

};

export default Protected;