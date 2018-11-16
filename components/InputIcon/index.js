import React from 'react';
import { fontSizes } from '../../lib/styling';
import Icon from '../Icon';
import styles from './styles';

const InputIcon = props => (
	<span className="icon">
		<style jsx>{styles}</style>
		<Icon fontSize={fontSizes.a2} {...props} />
	</span>
);

export default InputIcon;
