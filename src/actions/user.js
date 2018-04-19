import * as userActionTypes from '../actionTypes/user';

export function setUser(user) {
    return {
        type: userActionTypes.SET_USER,
        user,
    };
}

