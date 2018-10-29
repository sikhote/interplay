import React from 'react';
import NextApp, { Container } from 'next/app';
import Error from 'next/error';
import { syncRouting, getCurrentPath } from 'parlor';
import { matches, pages } from '../lib/routing';
import Empty from '../components/Empty';
import Page from '../components/Page';

class App extends NextApp {
	constructor(props) {
		super(props);
		this.state = {
			synced: false,
		};
	}

	componentDidMount() {
		syncRouting(matches, pages, () => this.setState({ synced: true }));
	}

	render() {
		const { Component, pageProps } = this.props;
		const { synced } = this.state;
		const currentPath = getCurrentPath();
		const match = matches.find(m => m(currentPath));
		const { page = '' } = match ? match(currentPath) : {};

		return (
			<Container>
				{synced ? (
					!match || !pages.includes(page) ? (
						<Error statusCode={404} />
					) : (
						<Page>
							<Component {...pageProps} />
						</Page>
					)
				) : (
					<Page>
						<Empty />
					</Page>
				)}
			</Container>
		);
	}
}

export default App;
