import React from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { snakeCase } from 'lodash';
import { View, TouchableOpacity, ActivityIndicator } from '../rnw';
import { colors } from '../../lib/styling';
import Icon from '../Icon';
import styles from './styles';

const IconButton = ({
	loading,
	onPress,
	icon,
	backgroundColor,
	color,
	disabled,
	style,
	className,
	fontSize,
}) => (
	<View>
		<TouchableOpacity
			className={className || snakeCase(icon)}
			disabled={disabled || loading}
			onPress={onPress}
			style={[
				styles.container,
				{
					backgroundColor:
						disabled || loading
							? transparentize(0.5, backgroundColor)
							: backgroundColor,
				},
				style,
			]}
		>
			{loading ? (
				<ActivityIndicator color={colors.icon} />
			) : (
				<Icon icon={icon} color={colors.icon} fontSize={fontSize} />
			)}
		</TouchableOpacity>
	</View>
);

IconButton.propTypes = {
	color: PropTypes.string,
	backgroundColor: PropTypes.string,
	icon: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	style: PropTypes.any,
	className: PropTypes.string,
	fontSize: PropTypes.number,
};

IconButton.defaultProps = {
	color: colors.white,
	backgroundColor: colors.a2,
	loading: false,
	disabled: false,
	style: {},
	className: '',
	fontSize: undefined,
};

export default IconButton;
