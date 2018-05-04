export default class LoadingGroup {
    constructor(fetchesInProgress = 0) {
        this.fetchesInProgress = fetchesInProgress;
        this.isLoading = fetchesInProgress > 0;
    }

    startFetch() {
        return new LoadingGroup(this.fetchesInProgress + 1);
    }

    completeFetch() {
        if (this.fetchesInProgress === 0) {
            throw new Error('Could not complete fetch, none were in progress.');
        }
        return new LoadingGroup(this.fetchesInProgress - 1);
    }
}