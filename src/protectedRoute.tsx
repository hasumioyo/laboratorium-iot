import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedLevels?: string[];
}

const ProtectedRoute = ({allowedLevels}: ProtectedRouteProps) => {
    const user = sessionStorage.getItem("user");
    if (!user) {
        return <Navigate to="/" replace />;
    }
    const dataUser = JSON.parse(user);
    if (
        allowedLevels &&
        !allowedLevels.includes(dataUser.level)
    ) {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;