import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './button.scss';

const Button = ({ block, className, ...props }) => {
    const buttonClass = classNames({
        'btn': true,
        'btn-block': block
    });

    return (<button
        className={classNames(buttonClass, className)}
        {...props}
    />);
};

Button.defaultProps = {
    block: false,
    className: undefined
};

Button.propTypes = {
    block: PropTypes.bool,
    className: PropTypes.string
};

export default Button;
