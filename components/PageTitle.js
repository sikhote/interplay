import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { injectIntl } from 'react-intl';

const PageTitle = ({ title, intl }) => (
	<Head>
		<title>
			{intl.formatMessage({ id: 'site_name' })}
			{title ? `${intl.formatMessage({ id: 'site_divider' })}${title}` : ''}
		</title>
	</Head>
);

PageTitle.propTypes = {
	title: PropTypes.string,
	intl: PropTypes.object.isRequired,
};

PageTitle.defaultProps = {
	title: '',
};

export default injectIntl(PageTitle);
