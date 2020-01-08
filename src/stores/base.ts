import { observable, action } from 'mobx';

export class BaseStore {
    @observable isLoading = false;

    @observable error = '';

    @action
    setIsLoading(isLoading: boolean): void {
        this.isLoading = isLoading;
    }

    @action
    setError(error: string): void {
        this.error = error;
    }

    @action
    handleError(err: Error) {
        console.log(err);
        this.error = err.message;
        this.isLoading = false;
    }

    @action
    startRequest() {
        this.isLoading = true;
        this.error = '';
    }

    @action
    endRequest() {
        this.isLoading = false;
        this.error = '';
    }

    @action
    applyInitialState(initialState) {
        Object.assign(this, initialState);
    }
}

export default new BaseStore();
