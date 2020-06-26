import { apiGet, apiPost } from '../utils/http';

export const requesUserList = async (params) => {
    const api = '/v1/api/user';
    return await apiGet(api, params);
}

export const requestCreateUser = async (data) => {
    const api = '/v1/api/user';
    return await apiPost(api, data);
}