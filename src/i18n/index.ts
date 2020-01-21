import enUS from './en-US';
import ruRU from './ru-RU';

const languages = {
    enUS,
    ruRU,
};

export default languages;

export function translate(code) {
    return languages.ruRU?.[code] || code;
}
