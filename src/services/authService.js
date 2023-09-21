import * as publicRequest from '@/utils/public-request';
import * as authorizationRequest from '@/utils/authorization-request';
import store from '../redux/store';

/** PUBLIC */

export const loginService = async (username, password) => {
    const path = 'auth/user/login';
    const payload = {
        username,
        password,
    };
    try {
        const result = await publicRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

/** AUTHORIZATION */

export const logoutService = async (phone_number) => {
    const path = 'auth/user/logout';
    const payload = {
        phone_number,
    };
    try {
        const result = await authorizationRequest.postApi(path, payload);
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
        const result = await authorizationRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const updateProfileService = async (data) => {
    const path = 'auth/user/profile-update';
    const accessToken = store.getState().user.accessToken;
    const payload = data;

    try {
        const result = await authorizationRequest.putApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};
