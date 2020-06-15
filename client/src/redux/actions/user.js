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

export const reset = () => ({ type: userActionTypes.USER_RESET })