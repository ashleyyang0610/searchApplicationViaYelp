import _ from 'lodash';
import moment from 'moment';

const dataParser = (type, data, _options) => {
    const metircNumberConf = [
        { divider: 1e18, suffix: 'P' },
        { divider: 1e15, suffix: 'E' },
        { divider: 1e12, suffix: 'T' },
        { divider: 1e9, suffix: 'G' },
        { divider: 1e6, suffix: 'M' },
        { divider: 1e3, suffix: 'K' }
    ];
    let options = {};
    switch (type) {
    case 'time': {
        const timeData = Number.isInteger(data) ? data : parseInt(data, 10);
        options = _.extend({
            format: 'YYYY-MM-DD HH:mm:ss',
            timezone: 0
        }, _options);

        return moment(timeData).utcOffset(options.timezone).format(options.format);
    }
    case 'time-duration': {
        const timeData = Number.isInteger(data) ? data : parseInt(data, 10);
        options = {
            format: 'mm:ss'
        };

        return moment(timeData).format(options.format);
    }
    case 'calculate-totalTime': {
        const now = moment();
        const totalTime = now - data;
        const dayAmount = Math.round(totalTime / 86400000);
        let displayData = '';
        if (dayAmount >= 1) {
            displayData = `${moment.duration(dayAmount, 'days').humanize()} ago`;
        } else {
            displayData = 'Less than 1 day ago';
        }

        return displayData;
    }
    case 'revert-timestamp':
        options = _.extend({
            format: 'YYYY-MM-DD HH:mm:ss'
        }, _options);

        return moment(data, options.format).format('X');
    case 'timeObj-by-range': {
        options = _.extend({
            range: 7,
            unit: 'days'
        }, _options);

        const startDate = moment(data).subtract(options.range, options.unit).format('YYYY-MM-DD');
        const startTime = moment(data).subtract(options.range, options.unit).format('HH:mm:ss');
        const endDate = moment(data).format('YYYY-MM-DD');
        const endTime = moment(data).format('HH:mm:ss');

        const timeObj = {
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime
        };

        return timeObj;
    }
    case 'format-timezone': {
        let displayedOffset = '';
        if (data > -1) {
            displayedOffset = `+${(`0${data}:00`).slice(-5)}`;
        } else {
            displayedOffset = `-${(`0${data}:00`).slice(-5)}`;
        }
        return displayedOffset;
    }
    case 'number':
        return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    case 'metric-number': {
        const metricItem = metircNumberConf.filter((each) => {
            return data >= each.divider;
        });

        if (metricItem.length > 0) {
            return (Math.round(data / metricItem[0].divider)).toString() + metricItem[0].suffix;
        } else {
            return data.toString();
        }
    }
    default:
        return '';
    }
};

export default dataParser;
