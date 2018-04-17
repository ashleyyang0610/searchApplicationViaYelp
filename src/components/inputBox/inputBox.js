import React from 'react';
import './inputBox.scss';

const Input = ({ ...props }) => {
    return (<input
        {...props}
        type="text"
    />);
};

export default Input;
