import i18n from 'utils/i18n';
import Promise from 'promise-polyfill';

const setIcon = () => {
    const icons = require.context('assets/images/logo-ico', true, /^\.\//);

    icons.keys().forEach((item) => {
        const link = document.createElement('link');

        if (item.indexOf('144') !== -1) {
            link.rel = 'apple-touch-icon-precomposed';
            link.sizes = '144x144';
        } else if (item.indexOf('114') !== -1) {
            link.rel = 'apple-touch-icon-precomposed';
            link.sizes = '114x114';
        } else if (item.indexOf('72') !== -1) {
            link.rel = 'apple-touch-icon-precomposed';
            link.sizes = '72x72';
        } else if (item.indexOf('.ico') !== -1) {
            link.rel = 'shortcut icon';
            link.type = 'image/x-icon';
        } else {
            link.rel = 'icon';
        }
        link.href = icons(item);
        document.getElementsByTagName('head')[0].appendChild(link);
    });
};

const setTitle = () => {
    document.title = i18n.t('product_name');
};

const setWindowPromise = () => {
    window.Promise = window.Promise || Promise;
};

const initial = () => {
    setTitle();
    setIcon();
    setWindowPromise();
};

export default initial;
