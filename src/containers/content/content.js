import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notification from 'components/notification/notification';
import SearchingPage from 'containers/searching/searchingPage';

const Content = ({ notification }) => {
    return (<section className="container">
        {
            notification.length > 0 && <Notification
                text={notification}
            />
        }
        <SearchingPage />
    </section>);
};

Content.propTypes = {
    notification: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
    notification: state.globals.notification
});

export default connect(
    mapStateToProps
)(Content);
