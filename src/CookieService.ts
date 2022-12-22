import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies';

type cookieNameType = 'localhost-cinema' | 'dev-cinema' | 'cinema';

export const COOKIE_NAME: cookieNameType =
    window.location.hostname === 'localhost'
        ? 'localhost-cinema'
        : window.location.hostname === 'dev-admin.cinema.com'
        ? 'dev-cinema'
        : 'cinema';

const COOKIE_DOMAIN = 'cinema.com';

class CookieService {
    setCookie(cValue: string, durationDays: number) {
        const d = new Date();
        d.setTime(d.getTime() + durationDays * 24 * 60 * 60 * 1000);

        if (window.location.hostname === 'localhost') {
            cookie.save(`${COOKIE_NAME}`, `${cValue}`, { path: '/', expires: d });
        } else {
            cookie.save(`${COOKIE_NAME}`, `${cValue}`, {
                path: '/',
                expires: d,
                domain: `${COOKIE_DOMAIN}`,
                secure: true,
                httpOnly: true,
            });
        }
    }

    getCookie() {
        return cookie.load(`${COOKIE_NAME}`) || null;
    }

    removeCookie() {
        if (window.location.hostname === 'localhost') {
            cookie.remove(`${COOKIE_NAME}`, { path: '/' });
        } else {
            cookie.remove(`${COOKIE_NAME}`, { path: '/', domain: `${COOKIE_DOMAIN}` });
        }
    }

    getScope(token: string): any {
        const decoded: any = jwt_decode(token);
        return decoded?.scope || '';
    }

    getRoles(): any {
        const decoded: any = jwt_decode(this.getCookie().token);
        return decoded?.role || '';
    }

    canAccessAdmin(token: string): any {
        return this.isAdminUser(token) || this.isRegisteredUser(token);
    }

    isRegisteredUser(token: string): any {
        const decoded: any = jwt_decode(token);
        const role = decoded?.role || '';
        return role.indexOf('registered_user') > -1;
    }

    isAdminUser(token: string): any {
        const decoded: any = jwt_decode(token);
        const role = decoded?.role || '';
        return role.indexOf('administrator') > -1;
    }
}

export const cookieService = new CookieService();