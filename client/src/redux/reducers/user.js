import * as userActionTypes from '../constants/user'

const initialState = {
    loaded: false,
    userList: [],
    result: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case userActionTypes.USER_FETCH:
            return Object.assign({}, state, { loaded: true });
        case userActionTypes.USER_SUCCESS:
            return Object.assign({}, state, { loaded: false }, { userList: action.result.data.list })
        case userActionTypes.USER_FAILURE:
            return Object.assign({}, state, { loaded: false })
        case userActionTypes.USER_CREATE_FETCH:
            return Object.assign({}, state, { loaded: true });
        case userActionTypes.USER_CREATE_SUCCESS:
            return Object.assign({}, state, { loaded: false }, { result: action.result.data })
        case userActionTypes.USER_CREATE_FAILURE:
            return Object.assign({}, state, { loaded: false })
        case userActionTypes.USER_RESET:
            return Object.assign({}, state, { data: null })
        default:
            return state;
    }
}