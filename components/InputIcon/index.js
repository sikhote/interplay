import React from 'react';
import { fontSizes, colors } from '../../lib/styling';
import Icon from '../Icon';
import styles from './styles';

const InputIcon = props => (
	<span className="icon">
		<style jsx>{styles}</style>
		<Icon color={colors.text} fontSize={fontSizes.a2} {...props} />
	</span>
);

export default InputIcon;
