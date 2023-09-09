import axios from 'axios';

const request = axios.create({
    baseURL: 'https://vn-public-apis.fpo.vn',
});

export const getApi = async (url, payload, token) => {
    const config = {
        params: payload,
    };
    if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
    }
    const response = await request.get(url, config);
    return response.data;
};

export const getProvincesService = async () => {
    const path = '/provinces/getAll';

    const payload = {
        limit: -1,
    };

    try {
        const result = await getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

/** DISTRICTS */

export const getDistrictsService = async (provinceCode) => {
    const path = '/districts/getByProvince';

    const payload = {
        provinceCode,
        limit: -1,
    };

    try {
        const result = await getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getWardsService = async (districtCode) => {
    const path = '/wards/getByDistrict';

    const payload = {
        districtCode,
        limit: -1,
    };

    try {
        const result = await getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};