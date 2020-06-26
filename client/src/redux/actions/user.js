import * as userActionTypes from '../constants/user'
import * as service from '../../service/user';

export const fetchUserList = () => ({
    types: [
        userActionTypes.USER_FETCH,
        userActionTypes.USER_SUCCESS,
        userActionTypes.USER_FAILURE
    ],
    sync: () => service.requesUserList()
})

export const requestCreateUser = (payload) => ({
    types: [
        userActionTypes.USER_CREATE_FETCH,
        userActionTypes.USER_CREATE_SUCCESS,
        userActionTypes.USER_CREATE_FAILURE
    ],
    sync: () => service.requestCreateUser(payload)
})

export const reset = () => ({ type: userActionTypes.USER_RESET })