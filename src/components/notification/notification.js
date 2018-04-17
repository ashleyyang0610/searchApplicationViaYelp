import React from 'react';
import PropTypes from 'prop-types';
import './notification.scss';

const Notification = ({ text }) => {
    return (<section
        className="notification"
    >
        <i className="fas fa-times-circle fa-fw" />
        {text}
    </section>);
};

Notification.defaultProps = {
    text: ''
};

Notification.propTypes = {
    text: PropTypes.node
};

export default Notification;
