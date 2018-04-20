import * as userActionTypes from '../actionTypes/user';

const getInitialState = () => ({
    userId: null,
    email: null,
    createdDate: null,
    matches: [],
    rating: null,
    photoURL: "",
    wins: null,
    losses: null,
});

export default function user(state = getInitialState(), action = {}) {
    switch(action.type) {
        // TODO: add case statements to respond to actions
        case userActionTypes.LOG_OUT_USER:
            return getInitialState();
        case userActionTypes.SET_USER:
            return {
                ...state,
                userId: action.data.id,
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