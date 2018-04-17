import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import i18n from 'utils/i18n';
import Input from 'components/inputBox/inputBox';
import Button from 'components/button/button';
import DateTimePicker from 'components/dateTimePicker/dateTimePicker';
import dataParser from 'utils/dataParser';
import { resetSearchDefault, submitSearchRequest } from 'ducks/modules/search';

class SearchingForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dateTime: '',
            dateTimePickerIsOpen: false,
            location: ''
        };
    }

    componentDidMount() {
        this.resetDefault();
    }

    getDateTimeVal= (val) => {
        this.setState({
            dateTime: dataParser('revert-timestamp', val)
        });
    }

    resetDefault = () => {
        const { resetSearchDefault } = this.props;
        resetSearchDefault();
    }

    preventFormSubmit = (e) => {
        e.preventDefault();
    }

    clickSearchBtn = () => {
        const {
            dateTime,
            location
        } = this.state;

        const {
            submitSearchRequest
        } = this.props;

        const config = {
            urlParams: {
                location: location,
                limit: 50,
                sort_by: 'rating',
                open_at: dateTime
            }
        };

        submitSearchRequest(config);
    }

    toggleDateTimePicker = () => {
        const {
            dateTimePickerIsOpen
        } = this.state;

        this.setState({
            dateTimePickerIsOpen: !dateTimePickerIsOpen
        });
    }

    updateLocation = (e) => {
        const target = e.target || e;
        const inputValue = _.trimStart(target.value);
        this.setState({
            location: inputValue
        });
    }

    render() {
        const {
            dateTime,
            dateTimePickerIsOpen,
            location
        } = this.state;

        return (<form
            ref={(node) => { this.form = node; }}
            onSubmit={this.preventFormSubmit}
            className="search-form"
        >
            <section className="form-group">
                <label
                    className="label-form"
                    htmlFor="location"
                >
                    {`${i18n.t('search:search.location')}:`}
                </label>
                <Input
                    autoFocus
                    name="location"
                    placeholder={i18n.t('search:search.location_placeholder')}
                    value={location}
                    disabled={false}
                    onChange={this.updateLocation}
                />
            </section>
            <section className="form-group">
                <label
                    className="label-form"
                    htmlFor="dateTime"
                >
                    {`${i18n.t('search:search.date_time')}:`}
                </label>
                <DateTimePicker
                    getDateTimeVal={this.getDateTimeVal}
                    isOpened={dateTimePickerIsOpen}
                />
            </section>
            <Button
                block
                className="form-group"
                disabled={!dateTime || !location}
                onClick={this.clickSearchBtn}
            >
                {i18n.t('search:search.search_button')}
            </Button>
        </form>);
    }
}

SearchingForm.propTypes = {
    submitSearchRequest: PropTypes.func.isRequired,
    resetSearchDefault: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
    return ({
        submitSearchRequest: config => dispatch(submitSearchRequest(config)),
        resetSearchDefault: () => dispatch(resetSearchDefault())
    });
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchingForm);
