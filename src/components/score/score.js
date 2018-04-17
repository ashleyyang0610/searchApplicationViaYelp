import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './score.scss';

const EachStar = ({ percentage }) => {
    return (<section
        className="star-container"
    >
        <i className="star-under fas fa-star" />
        <i
            className="star-over fas fa-star"
            style={percentage !== undefined ? { width: `${percentage}%` } : undefined}
        />
    </section>);
};

class Score extends PureComponent {
    renderIntScore = (times) => {
        let currentTimes = 0;
        const intScore = [];
        while (currentTimes < times) {
            intScore.push(<EachStar key={currentTimes} />);
            currentTimes += 1;
        }

        return intScore;
    }

    renderFloatScore = (floatScore) => {
        if (floatScore > 0) {
            return (<EachStar
                percentage={floatScore * 100}
            />);
        } else {
            return (<EachStar
                percentage={0 * 100}
            />);
        }
    }

    render() {
        const {
            val
        } = this.props;
        const intScore = parseInt(val, 10);
        const floatScore = val - intScore;
        return (<section
            className="score"
        >
            {this.renderIntScore(intScore)}
            {this.renderFloatScore(floatScore)}
            {parseFloat(Math.round(val * 100) / 100).toFixed(1)}
        </section>);
    }
}

Score.defaultProps = {
    val: 5
};

Score.propTypes = {
    val: PropTypes.number
};

export default Score;
