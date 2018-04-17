import React from 'react';
import PropTypes from 'prop-types';
import Score from 'components/score/Score';
import i18n from 'utils/i18n';

const SearchingResultContent = ({ data, ...props }) => {
    return (<section
        {...props}
        className="search-result-content"
    >
        <h3>{data.name}</h3>
        <Score val={data.rating} />
        <p>{`${i18n.t('search:search.result.location')}: ${data.location}`}</p>
        <p>{`${i18n.t('search:search.result.display_phone')}: ${data.display_phone}`}</p>
        <p>{`${i18n.t('search:search.result.price')}: ${data.price}`}</p>
    </section>);
};

SearchingResultContent.defaultProps = {
    data: {}
};

SearchingResultContent.propTypes = {
    data: PropTypes.object
};

export default SearchingResultContent;
