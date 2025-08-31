import { useToast } from "../components/Notification/Notification.jsx";
import { useNavigate } from "react-router-dom";


export function getXsrfToken() {
    return document.cookie
        .split(";")
        .find((row) => row.trim().startsWith("XSRF-TOKEN"))
        ?.split("=")[1];
}

export function useApi() {
    const { showToast } = useToast();
    const navigate = useNavigate();

    const makeRequest = async ({ method, route, body, setFunction, isToast=true }) => {
        const token = getXsrfToken();
        if (!token) {
            console.error("XSRF-TOKEN not found in cookies");
        }
        const config = {
            method,
            credentials: "include",
            headers: {
                Accept: "application/json",
                "X-XSRF-TOKEN": decodeURIComponent(token),
                ...(body && { "Content-Type": "application/json" }),
            },
            ...(body && { body: JSON.stringify(body) }),
        };

        try {
            const response = await fetch(route, config); 
            const data = await response.json();
            console.log(data);

            if (isToast) {
                if (["POST", "PATCH", "PUT", "DELETE"].includes(config.method)) {
                    if (response.status === 200 || response.status === 201 || response.status === 203) {
                        showToast("success", data.message);
                    } else if (response.status === 403) {
                        window.history.back();
                        showToast("warning", "У вас нет прав доступа");
                    } else if (response.status === 422) {
                        if (data.errors) {
                            if (data.errors.lesson_end) {
                                showToast("warning", data.errors.lesson_end);
                                return;
                            } else if (data?.errors.end_date) {
                                showToast("warning", data.errors.end_date);
                                return;
                            }
                        } else {
                            showToast("warning", data.message);
                            return;
                        }
                    } else {
                        showToast("warning", data.message);
                        return;
                    }
                } else {
                    if (response.status === 401) {
                        navigate(-1);
                        showToast("warning", "Вы не авторизованы");
                    }
                    if (response.status === 429) {
                        navigate(-1);
                        showToast("warning", "Вы слишком часто обращаетесь к ресурсам. Попробуйте позже");
                    }
                }

                if (data.back) {
                    showToast("info", data.message);
                    setTimeout(() => {
                        navigate(-1);
                    }, 1500);
                }
            }

            if (setFunction) {
                setFunction(data);
            }
            return data;
            
        } catch (error) {
            console.error("Fetch error:", error);
            showToast("warning", "Ошибка сети");
            return null;
        }
    };

    return { makeRequest };
}