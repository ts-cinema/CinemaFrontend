import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { cookieService } from '../../CookieService';
import jwt_decode from 'jwt-decode';

const RequireAuth = ({ allowedRoles }: any) => {
    const location = useLocation();
    const cookie = cookieService.getCookie();
    var decoded: any;
    var decodedRole: any;
    var accessToken: any;
    if (cookie !== null) {
        accessToken = cookie?.token;
        decoded = jwt_decode(accessToken);
        decodedRole = decoded?.role || '';
    }

    return allowedRoles.find((role: any) => decodedRole === role) ? (
        <Outlet />
    ) : accessToken ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;