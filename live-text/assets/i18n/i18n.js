import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ru from './ru.json';
import en from './en.json';

i18n.use(initReactI18next).init({
lng: 'ru',
fallbackLng: 'ru',
resources: {
	en: en,
	ru: ru,
},
interpolation: {
	escapeValue: false // react already safes from xss
}
});

export default i18n;
