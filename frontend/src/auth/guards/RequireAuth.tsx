import { useAuth } from "@hooks/useAuth";
import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

type RequireAuthProps = {
  children: ReactElement
};

const RequireAuth = ({ children }: RequireAuthProps) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;