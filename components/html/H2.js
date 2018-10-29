import React from 'react';
import Text from '../Text';
import { fontSizes, colors, lineHeights } from '../../lib/styling';

const H2 = props => (
	<Text
		color={colors.h2}
		fontSize={fontSizes.h2}
		lineHeight={lineHeights.close}
		{...props}
	/>
);

export default H2;
