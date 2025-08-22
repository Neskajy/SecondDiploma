import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../api/apiClient";

export default function LogoutPage() {
    const [isLogout, setIsLogout] = useState(false);
    const Navigate = useNavigate();
    const api_url = import.meta.env.VITE_BACKEND_URL;

    async function logout() {
        await makeRequest({
            method: "GET",
            route: api_url + "/api/authentication/logout"
        });
        function deleteCookie(name) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; samesite=lax`;
        }
        deleteCookie("laravel_session");
        deleteCookie("XSRF-TOKEN");
    }

    useEffect(() => {
        async function handleLogout() {
            try {
                await logout();
                setIsLogout(true);
            } catch (e) {
                console.error("Ошибка при выходе из системы: ", e);
                setIsLogout(false);
            }
        }
        handleLogout();
    }, []);

    Navigate("/");

    return (
        <div>
            {isLogout ? (
                <h3>Вы успешно вышли из системы</h3>
            ) : (
                <h3>Ошибка выхода из системы</h3>
            )}
        </div>
    )
}