import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { injectIntl } from 'react-intl';

const CustomHead = ({ title, intl }) => (
	<Head>
		<title>
			{intl.formatMessage({ id: 'site_name' })}
			{title ? `${intl.formatMessage({ id: 'site_divider' })}${title}` : ''}
		</title>
	</Head>
);

CustomHead.propTypes = {
	title: PropTypes.string,
	intl: PropTypes.object.isRequired,
};

CustomHead.defaultProps = {
	title: '',
};

export default injectIntl(CustomHead);
