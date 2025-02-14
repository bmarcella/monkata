
export function requireAuth(navigate: any) {
    const isAuthenticated = Boolean(localStorage.getItem("authToken"));
    if (!isAuthenticated) {
        navigate("/auth/login");
    }
}

export function notRequireAuth(navigate: any) {
    const isAuthenticated = Boolean(localStorage.getItem("authToken"));
    if (!isAuthenticated) {
        navigate("/dashboard");
    }
}

export const Log = (log: any) => {
    console.log(log);
}
