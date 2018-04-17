import i18n from 'i18next';
import resBundle from 'i18next-resource-store-loader?include=\\.json$!assets/i18n/index';

const defaultLang = 'en';
const lang = 'en';

i18n.init({
    resources: resBundle,
    lng: lang,
    fallbackLng: defaultLang,
    defaultNS: 'common',
    ns: [
        'common',
        'search'
    ],
    interpolation: {
        escapeValue: false
    }
});

window.i18n = i18n;

export default i18n;
