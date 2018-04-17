import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';
import Input from 'components/inputBox/inputBox';
import i18n from 'utils/i18n';
import nodeParser from 'utils/nodeParser';
import './dateTimePicker.scss';

class DateTimePicker extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dateTime: moment(),
            isShowPicker: false
        };
    }

    componentDidMount() {
        this.outputDateTimeVal();
        this.addClickEventListener();
    }

    componentWillUnmount() {
        this.removeClickEventListener();
    }

    onChangeDataTimePicker = (dateTime) => {
        this.setState({
            dateTime: dateTime
        });
    }

    addClickEventListener = () => {
        window.addEventListener('click', this.handleWindowClick);
    }

    removeClickEventListener = () => {
        window.removeEventListener('click', this.handleWindowClick);
    }

    handleWindowClick = (el) => {
        const {
            isShowPicker
        } = this.state;

        if (!isShowPicker) return;

        const target = el.target || el;

        if (!nodeParser('find-up-class', target, { classname: 'dateTimePicker' })) {
            this.toggleDateTimePicker();
            this.outputDateTimeVal();
        }
    }

    outputDateTimeVal = () => {
        const {
            dateTime
        } = this.state;

        const {
            getDateTimeVal
        } = this.props;

        getDateTimeVal(dateTime);
    }

    toggleDateTimePicker = () => {
        const {
            isShowPicker
        } = this.state;

        this.setState({
            isShowPicker: !isShowPicker
        });
    }

    render() {
        const {
            dateTime,
            isShowPicker
        } = this.state;

        return (<section className="dateTimePicker">
            <Input
                readOnly
                placeholder={i18n.t('search:search.date_time_placeholder')}
                value={moment(dateTime).format('dddd[,] hh:mm a')}
                onClick={this.toggleDateTimePicker}
            />
            {
                isShowPicker && <Datetime
                    input={false}
                    open={true}
                    defaultValue={dateTime}
                    onChange={this.onChangeDataTimePicker}
                />
            }
        </section>);
    }
}

DateTimePicker.propTypes = {
    getDateTimeVal: PropTypes.func.isRequired
};

export default DateTimePicker;
