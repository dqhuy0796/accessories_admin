import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8000/api/',
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

export const postApi = async (url, payload, token) => {
    const config = {};
    if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
    }
    const response = await request.post(url, payload, config);
    return response.data;
};

export const putApi = async (url, payload, token) => {
    const config = {};
    if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
    }
    const response = await request.put(url, payload, config);
    return response.data;
};

export const deleteApi = async (url, payload, token) => {
    const config = {
        data: payload,
    };
    if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
    }
    const response = await request.delete(url, config);
    return response.data;
};

export default request;
