import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from 'components/list/list';
import SearchingResultContent from './searchingResultContent';

class SearchingResult extends PureComponent {
    renderFunc = (eachData) => {
        return <SearchingResultContent data={eachData} />;
    }

    render() {
        const {
            searchIsFetching,
            searchData
        } = this.props;

        return (<section className="search-result">
            <List
                data={searchData}
                isFetching={searchIsFetching}
                renderFunc={this.renderFunc}
            />
        </section>);
    }
}

SearchingResult.propTypes = {
    searchIsFetching: PropTypes.bool.isRequired,
    searchData: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    searchIsFetching: state.search.isFetching,
    searchData: state.search.data
});

export default connect(
    mapStateToProps
)(SearchingResult);
