import React from 'react';
import i18n from 'utils/i18n';

const Header = () => {
    return (<header>
        <h1>
            <a href="/">
                <i className="fas fa-utensils fa-inverse fa-fw fa-border background-primary" />
                <span className="header-title">{i18n.t('header')}</span>
            </a>
        </h1>
    </header>);
};

export default Header;
