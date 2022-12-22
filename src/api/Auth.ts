import interceptionAxios from "./InterceptionAxios";
import {cookieService} from "../CookieService"

export const signUp = async (newUser: any) => {
    return interceptionAxios.post('/api/v1/cinema/auth/register', newUser).then(response => response)
};

export const login = async (user: any) => {
    return interceptionAxios.post('/api/v1/cinema/auth/login', user).then(response => response)
};

export const logout = async () => {
    cookieService.removeCookie();
};