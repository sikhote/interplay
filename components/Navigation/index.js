import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { fontSizes, colors } from '../../lib/styling';
import getMenuItems from '../../lib/getMenuItems';
import Icon from '../Icon';
import Text from '../Text';
import styles from './styles';

const Navigation = ({ router, playlists }) => {
	const alpha = get(router.query, 'alpha');
	const path = `${router.pathname}${alpha ? `/${alpha}` : ''}`;

	return (
		<div className="container">
			<style jsx>{styles}</style>
			{getMenuItems(playlists).map(({ key, title, icon, className }) => (
				<Link key={key} href={`/${key}`}>
					<a className={`item ${className}`}>
						<Icon
							icon={icon}
							fontSize={fontSizes.navigationItem}
							color={
								key === path
									? colors.navigationItemActive
									: colors.navigationItem
							}
						/>
						<Text
							className="item-title"
							fontSize={fontSizes.navigationItem}
							color={
								key === path
									? colors.navigationItemActive
									: colors.navigationItem
							}
						>
							{title}
						</Text>
					</a>
				</Link>
			))}
		</div>
	);
};

Navigation.propTypes = {
	router: PropTypes.object.isRequired,
	playlists: PropTypes.array.isRequired,
};

export default withRouter(
	connect(
		({ playlists }) => ({
			playlists,
		}),
		null,
	)(Navigation),
);
