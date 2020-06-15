import { apiGet } from '../utils/http';

export const requesUserList = async (params) => {
    const api = '/v1/api/user';
    // return await apiGet(api, params).then(res => res.data);
    return await apiGet(api, params);
}