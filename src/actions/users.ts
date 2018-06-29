import * as usersActionTypes from '../actionTypes/users';
import User from '../models/user';
import Match from '../models/match';

export function setAllUsers(users: User[]) {
    return {
        type: usersActionTypes.SET_ALL_USERS,
        data: users,
    }
}

export function updateUsersWithMatch(newMatch: Match){
    return {
        type: usersActionTypes.UPDATE_USER_MATCHES,
        data: newMatch,
    }
}


