import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import store from 'ducks/configureStore';
import i18n from 'utils/i18n';
import Main from 'containers/main/main';
import './common.scss';

ReactDOM.render((
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <Main />
        </Provider>
    </I18nextProvider>
), document.getElementById('app'));
