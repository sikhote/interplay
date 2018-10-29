import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { getLocale } from 'parlor';

export default class IntlDocument extends Document {
	render() {
		return (
			<html lang={getLocale()}>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
