import * as loadingActionTypes from '../actionTypes/loading';

export function startLoading() {
    return {
        type: loadingActionTypes.START_LOADING,
    }
}

export function stopLoading() {
    return {
        type: loadingActionTypes.STOP_LOADING,
    }
}

