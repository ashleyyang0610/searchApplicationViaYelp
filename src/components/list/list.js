import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/loader/loader';
import './list.scss';

const List = ({
    isFetching,
    renderFunc,
    noData,
    data,
    ...props
}) => {
    return (<ul
        {...props}
        className="list-unstyled list-inline"
    >
        {
            isFetching && <Loader />
        }
        {
            !isFetching && data.map((each, i) => {
                return <li key={i}>{renderFunc(each)}</li>;
            })
        }
        {
            (!isFetching && data.length === 0) && noData()
        }
    </ul>);
};

List.defaultProps = {
    noData: () => {
        return 'No Data';
    },
    data: [],
    isFetching: false,
    renderFunc: (each) => {
        return each.toString();
    }
};

List.propTypes = {
    noData: PropTypes.func,
    data: PropTypes.array,
    isFetching: PropTypes.bool,
    renderFunc: PropTypes.func
};

export default List;
