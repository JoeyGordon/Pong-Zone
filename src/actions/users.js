import * as usersActionTypes from '../actionTypes/users';

export function setAllUsers(users) {
    return {
        type: usersActionTypes.SET_ALL_USERS,
        data: users,
    }
}

export function updateUsersWithMatch(newMatch){
    return {
        type: usersActionTypes.UPDATE_USER_MATCHES,
        data: newMatch,
    }
}


