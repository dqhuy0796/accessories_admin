import * as publicRequest from '@/utils/public-request';
import * as authorizationRequest from '@/utils/authorization-request';
import store from '../redux/store';

/** PUBLIC */

export const getPaymentMethodsService = async () => {
    const path = 'payment-method/get';

    const payload = {};

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getOrdersCountService = async () => {
    const path = 'order/count';

    const payload = {};

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getOrdersService = async (status, page) => {
    const path = 'auth/order/get';

    const payload = {
        status,
        page,
    };

    try {
        const result = await authorizationRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getOrderByIdService = async (order_id) => {
    const path = 'order/get';

    const payload = {
        order_id,
    };

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

/** AUTHORIZATION */

const accessToken = store.getState().user.accessToken;

export const createOrderService = async (data) => {
    const path = 'order/create';

    const payload = data;

    try {
        const result = await authorizationRequest.postApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const updateOrderService = async (data) => {
    const path = 'order/update';

    const payload = data;

    try {
        const result = await authorizationRequest.putApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const deleteOrderService = async (data) => {
    const path = 'order/delete';

    const payload = data;

    try {
        const result = await authorizationRequest.deleteApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};
