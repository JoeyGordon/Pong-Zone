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
            return new LoadingGroup();
        }
        return new LoadingGroup(this.fetchesInProgress - 1);
    }
}