import * as authorizationRequest from '@/utils/authorization-request';
import store from '../redux/store';

/** USER */

export const getRolesService = async (role_id) => {
    const path = 'role/get';
    const accessToken = store.getState().user.accessToken;
    const payload = {
        role_id,
    };

    try {
        const result = await authorizationRequest.getApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getUsersCountService = async (role_id) => {
    const path = 'user/count';

    const payload = {
        role_id,
    };

    try {
        const result = await authorizationRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getUsersService = async (role_id, slug, page) => {
    const path = 'user/get';
    const accessToken = store.getState().user.accessToken;
    const payload = {
        role_id,
        slug,
        page,
    };

    try {
        const result = await authorizationRequest.getApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getUserByUsernameService = async (username) => {
    const path = 'user/get';
    const accessToken = store.getState().user.accessToken;
    const payload = {
        username,
    };

    try {
        const result = await authorizationRequest.getApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const createUserService = async (data) => {
    const path = 'user/create';
    const accessToken = store.getState().user.accessToken;
    const payload = data;

    try {
        const result = await authorizationRequest.postApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const updateUserService = async (data) => {
    const path = 'user/update';
    const accessToken = store.getState().user.accessToken;
    const payload = data;

    try {
        const result = await authorizationRequest.putApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const deleteUserService = async (data) => {
    const path = 'user/delete';
    const accessToken = store.getState().user.accessToken;
    const payload = data;

    try {
        const result = await authorizationRequest.deleteApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};
