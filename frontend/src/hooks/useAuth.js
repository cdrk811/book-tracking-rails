import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutAPI } from "../apis/authentication.js";

const useAuth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['jwt', 'user'])
    const navigate = useNavigate();
    const [user, setUser] = useState(cookies.user || null);

    useEffect(() => {
        if (cookies.jwt && cookies.user) {
            setUser(cookies.user);
        } else {
            setUser(null);
        }
    }, [cookies.jwt, cookies.user]);

    const handleAuth = async (api, userData, setErrors) => {
        const [response, error] = await api(userData);

        if (error) {
            setErrors(prev => ({ ...prev, api: error }));
        } else {
            const jwt = response.headers.get('Authorization')
            const result = await response.json();
            // const message = result.message;
            const user = result.data;

            setCookie('jwt', jwt, { path: '/' });
            setCookie('user', JSON.stringify(user), { path: '/' });

            navigate('/');
        }
    };

    const handleLogout = async () => {
        await logoutAPI(cookies.jwt);

        removeCookie("jwt", { path: "/" });
        removeCookie("user", { path: "/" });
        setUser(null);
        navigate("/sign_in");
    };

    return { user, handleAuth, handleLogout }
}

export default useAuth;