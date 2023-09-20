import * as request from '@/utils/baseRequest';
import store from '../redux/store';

export const loginService = async (username, password) => {
    const path = 'auth/user/login';
    const payload = {
        username,
        password,
    };
    try {
        const result = await request.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const logoutService = async (phone_number) => {
    const path = 'auth/user/logout';
    const payload = {
        phone_number,
    };
    try {
        const result = await request.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const refreshTokensService = async () => {
    const path = 'auth/user/refresh';
    const refreshToken = store.getState().user.refreshToken;
    const payload = {
        'x-refresh-token': refreshToken,
    };
    try {
        const result = await request.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};
