import * as userActionTypes from '../actionTypes/user';

const getInitialState = () => ({
    id: null,
    email: null,
    createdDate: null,
    matches: [],
    rating: null,
    photoURL: "",
    wins: null,
    losses: null,
});

export default function user(state = getInitialState(), action) {
    switch (action.type) {
        case userActionTypes.LOG_OUT_USER:
            return getInitialState();
        case userActionTypes.SET_USER:
            return {
                ...state,
                id: action.data.id,
                email: action.data.email,
                createdDate: action.data.createdDate,
                matches: action.data.matches,
                rating: action.data.rating,
                photoURL: action.data.photoURL,
                wins: action.data.wins,
                losses: action.data.losses,
                name: action.data.name,
            }
        default:
            return state;
    }
}