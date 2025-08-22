export function getXsrfToken() {
    return document.cookie
        .split(";")
        .find((row) => row.trim().startsWith("XSRF-TOKEN"))
        ?.split("=")[1];
}

export async function makeRequest({ method, route, body, setFunction }) {
    const token = getXsrfToken();
    if (!token) {
        console.error("XSRF-TOKEN not found in cookies");
        return null;
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
        const request = await fetch(route, config);
        const response = await request.json();
        console.log(response)

        if (setFunction) {
            setFunction(response);
        }

        return response;
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}