import React from 'react';
import './loader.scss';

const Loader = ({ ...props }) => {
    return (<i
        {...props}
        className="fas fa-spinner fa-pulse fa-3x center-aligned"
    />);
};

export default Loader;
