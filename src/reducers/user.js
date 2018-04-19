const getInitialState = () => ({
    userId: null,
    createdDate: null,
    matchess: [],
    rating: null,
    wins: null,
    losses: null,
});

export default function user(state = getInitialState(), action = {}) {
    switch(action.type) {
        // TODO: add case statements to respond to actions
        default:
            return state;
    }
}