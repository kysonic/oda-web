import globalStore from '@stores/global';

import enUS from './en-US';
import ruRU from './ru-RU';

const languages = {
    enUS,
    ruRU,
};

export default languages;

export function translate(code) {
    return languages[globalStore.appStore.strippedLanguage]?.[code] || code;
}
