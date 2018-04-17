import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchingForm from './searchingForm';
import SearchingResult from './searchingResult';

const SearchingPage = ({ ...props }) => {
    const {
        isFirstAccess
    } = props;

    const toggleFormClass = classNames({
        'search-page': true,
        'isPinned': !isFirstAccess
    });

    return (<section className={toggleFormClass}>
        <SearchingForm />
        <SearchingResult />
    </section>);
};

SearchingPage.propTypes = {
    isFirstAccess: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isFirstAccess: state.globals.isFirstAccess
});

export default connect(
    mapStateToProps
)(SearchingPage);
