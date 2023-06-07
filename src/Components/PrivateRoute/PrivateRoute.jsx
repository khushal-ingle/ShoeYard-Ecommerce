import { Navigate, useLocation } from "react-router";
import { DataContext } from "../../Contexts/DataContext";
import { useContext } from "react";

export const PrivateRoute = ({children}) => {
    const { token } = useContext(DataContext);
    const location = useLocation();
    return token ? children : <Navigate to="/login" state={{ from: location?.pathname }}/>;
}