import { observable, action, computed } from 'mobx';

export class AppStore {
    @observable language = 'en-US';

    @computed get strippedLanguage() {
        return this.language.replace('-', '');
    }

    @action
    changeLanguage(newLanguage) {
        this.language = newLanguage;
    }
}

export default new AppStore();
