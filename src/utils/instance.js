import { mapTokens } from '@/redux/actions/userAction';
import store from '@/redux/store';
import axios from 'axios';

const instance = axios.create({
    baseURL:
        import.meta.env.MODE === 'development'
            ? import.meta.env.VITE_DEVELOPMENT_SERVER_URL
            : import.meta.env.VITE_PRODUCTION_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().user.accessToken;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

let retryCounter = 0;

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            if (err.response.status === 401 && !originalConfig._retry && retryCounter < 5) {
                
                originalConfig._retry = true;
                retryCounter++;

                try {
                    const res = await instance.post('/auth/user/refresh', {
                        'x-refresh-token': store.getState().user.refreshToken,
                    });
                    const { accessToken, refreshToken } = res.data;
                    store.dispatch(mapTokens(accessToken, refreshToken));
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    },
);

export default instance;
