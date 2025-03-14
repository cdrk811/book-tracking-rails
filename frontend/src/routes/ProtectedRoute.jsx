import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = () => {
    const [cookies] = useCookies([])

    return cookies.jwt ? <Outlet /> : <Navigate to='/sign_in' replace />
}

export default ProtectedRoute;