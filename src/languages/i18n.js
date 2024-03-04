import i18next from 'i18next';
import portuguese from './portuguese.json';
import english from './english.json';
import { initReactI18next } from 'react-i18next';


i18next
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng: 'pt',
        resources: {
            pt: portuguese,
            en: english,
        },
        react: {
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false, // not needed for react!!
        }
    });

export default i18next;