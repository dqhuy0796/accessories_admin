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

export const createProductService = async (data) => {
    const path = 'product/create';

    const payload = data;

    try {
        const result = await request.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getProductsService = async (category_id) => {
    const path = 'product/get';

    const payload = {
        category_id,
    };

    try {
        const result = await request.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getProductByIdService = async (product_id) => {
    const path = 'product/get';

    const payload = {
        product_id,
    };

    try {
        const result = await request.getApi(path, payload);
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

export const deleteProductService = async (data) => {
    const path = 'product/delete';

    const payload = data;

    try {
        // const result = await request.deleteApi(path, payload);
        // return result;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};
