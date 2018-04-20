import * as userActionTypes from '../actionTypes/user';

const getInitialState = () => ({
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
        case userActionTypes.SET_USER:
            return {
                ...state,
                email: action.data.email,
                createdData: action.data.createdData,
                matches: action.data.matches,
                rating: action.data.rating,
                photoURL: action.data.photoURL,
                wins: action.data.wins,
                losses: action.data.losses,
            }
        default:
            return state;
    }
}