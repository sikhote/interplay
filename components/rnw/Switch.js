import React from 'react';
import { Switch as RNWSwitch } from 'react-native-web';
import { colors } from '../../lib/styling';

const Switch = props => (
	<RNWSwitch
		thumbColor={colors.a4}
		activeThumbColor={colors.white}
		activeTrackColor={colors.a2}
		color={colors.a1}
		{...props}
	/>
);

export default Switch;
