import * as loadingActionTypes from '../actionTypes/loading';
import LoadingGroup from '../utils/loadingGroup';

const loadingGroup = new LoadingGroup();
const getInitialState = () => (loadingGroup);

export default function loading(state = getInitialState(), action = {}) {
    switch (action.type) {
        case loadingActionTypes.START_LOADING:
            return state.startFetch();
        case loadingActionTypes.STOP_LOADING:
            return state.completeFetch();
        default:
            return state;
    }
}