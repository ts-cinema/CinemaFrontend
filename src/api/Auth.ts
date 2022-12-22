import interceptionAxios from "./InterceptionAxios";

export const signUp = async (newUser: any) => {
    return interceptionAxios.post('/api/v1/cinema/Auth/register', newUser).then(response => response)
};

export const login = async (user: any) => {
    return interceptionAxios.post('/api/v1/cinema/Auth/login', user).then(response => response)
};

export const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
};