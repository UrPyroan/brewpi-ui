import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
const classNames = require('classnames');

import styles from './styles.css';
import { Liquids } from '../Liquids';
import { RotateCss } from '../sharedCss';
import { SvgParent } from '../SvgParent';
import { pickLiquid } from '../Flows';

const SvgTubes = require('./svg/tubes.svg?tag=g');
const SvgBall = require('./svg/ball.svg?tag=g');
const SvgBlades = require('./svg/blades.svg?tag=g');
const SvgLiquidPump = require('./svg/liquid_pump.svg?tag=g');

class Pump extends React.Component {
  static flows = (data) => {
    const power = data.getIn(['settings', 'power']);
    if (power) {
      return { r: 'l+99' };
    }
    return { l: 'r', r: 'l' };
  };

  render() {
    const power = this.props.settings.power;
    const speed = this.props.settings.speed;
    const flip = this.props.flip;
    const liquid = pickLiquid(this.props.flows);
    const unflipStyle = flip ? styles.unflip : undefined; // is parent flipped?

    let bladeRotateStyle = {};
    let bladeRotateClass = {};

    if (power === true) {
      bladeRotateStyle = RotateCss.speedStyle(speed, false); // pumps turn counter-clockwise
      bladeRotateClass = RotateCss.styles.rotate;
    }
    return (
      <button className={styles.pump} onClick={() => this.props.onClicked(this.props.id, this.props.settings.power)}>
        <SvgParent>
          <SvgBall className={styles.ball} style={Liquids.fillStyle(liquid)} />
          <g className={styles.bladesWrapper}>
            <SvgBlades className={classNames(styles.blades, bladeRotateClass)} style={bladeRotateStyle} />
          </g>
          <SvgLiquidPump className={styles.liquid} style={Liquids.strokeStyle(liquid)} />
          <SvgTubes className={classNames(styles.tubes)} />
        </SvgParent>
        <span className={classNames(styles.id, unflipStyle)}>{this.props.id}</span>
      </button>
    );
  }
}
Pump.propTypes = {
  settings: React.PropTypes.shape({
    power: React.PropTypes.boolean,
    speed: React.PropTypes.number, // 0-100
  }),
  flows: React.PropTypes.array,
  id: React.PropTypes.string,
  onClicked: React.PropTypes.func,
  flip: React.PropTypes.bool,
};
Pump.defaultProps = {
  settings: {
    power: false,
    speed: 100,
  },
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onClicked: (partId, oldPower) => dispatch(actions.powerTogglableClicked(partId, oldPower)),
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Pump);
