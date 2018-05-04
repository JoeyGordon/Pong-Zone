import * as loadingActionTypes from '../actionTypes/loading';
import LoadingGroup from '../utils/loadingGroup';

// function LoadingGroup(fetchesInProgress = 0) {
//     this.fetchesInProgress = fetchesInProgress;
//     this.isLoading = fetchesInProgress > 0;
// }

// LoadingGroup.prototype.startFetch = function () {
//     return LoadingGroup(this.fetchesInProgress + 1);
// };

// LoadingGroup.prototype.completeFetch = function () {
//     if (this.fetchesInProgress === 0) {
//         throw new Error('Could not complete fetch, none were in progress');
//     }
//     return LoadingGroup(this.fetchesInProgress - 1);
// };

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