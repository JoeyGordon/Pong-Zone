import * as userActionTypes from '../actionTypes/user';

export function setUser(user) {
    return {
        type: userActionTypes.SET_USER,
        data: user,
    };
}

export function logOutUser() {
    return {
        type: userActionTypes.LOG_OUT_USER,
    };
}

