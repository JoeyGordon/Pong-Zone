import * as userActionTypes from '../actionTypes/user';
import User from '../models/user';

export function setUser(user: User) {
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

