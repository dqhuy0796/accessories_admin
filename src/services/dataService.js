import * as request from '@/utils/baseRequest';
import store from '../redux/store';

/** PRODUCT */

export const getCategoriesService = async () => {
    const path = 'category/get';

    const payload = {};

    try {
        const result = await request.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getMaterialsService = async () => {
    const path = 'material/get';

    const payload = {};

    try {
        const result = await request.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

/** USER */

export const getRolesService = async () => {
    const path = 'role/get';

    const payload = {};

    try {
        const result = await request.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getUsersService = async (username) => {
    const path = 'user/get';

    const payload = {
        username,
    };

    try {
        const result = await request.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getUserByIdService = async (userId) => {
    const path = 'user/get';

    const payload = {
        userId,
    };

    try {
        const result = await request.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const createUserService = async (data) => {
    const path = 'user/create';

    const payload = data;

    try {
        const result = await request.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const updateUserService = async (data) => {
    const path = 'user/update';

    const payload = data;

    try {
        const result = await request.putApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const deleteUserService = async (data) => {
    const path = 'user/delete';

    const payload = data;

    try {
        const result = await request.deleteApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};
