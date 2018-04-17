import React from 'react';
import './notification.scss';

const Notification = ({ ...props }) => {
    return (<section
        className="notification"
    >
        <i className="fas fa-times-circle fa-fw" />
        {props.text}
    </section>);
};

export default Notification;
