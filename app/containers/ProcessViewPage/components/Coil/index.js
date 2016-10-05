/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "props" }] */
import React from 'react';
import styles from './styles.css';
import { Liquids } from '../Liquids';

const SvgCoil = require('./svg/coil.svg?tag=g');
const SvgLiquidCoil = require('./svg/liquid_coil.svg?tag=g');

import { SvgParent } from '../SvgParent';

export const Coil = (props) => (
  <SvgParent viewBox={'0 0 200 100'}>
    <SvgLiquidCoil className={styles.liquid} style={Liquids.strokeStyle(props.liquid)} />
    <SvgCoil className={styles.coil} />

  </SvgParent>
);
Coil.propTypes = {
  liquid: React.PropTypes.string,
};