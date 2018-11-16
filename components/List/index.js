import React from 'react';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { get } from 'lodash';
import { Button, Input } from 'antd';
import getSortedData from '../../lib/getSortedData';
import getSearchedData from '../../lib/getSearchedData';
import getSourcedData from '../../lib/getSourcedData';
import { settingsReplace } from '../../actions/settings';
import { filesGetUrl } from '../../actions/files';
import getListColumns from '../../lib/getListColumns';
import { titleToSlug } from '../../lib/playlists';
import getDefaulListSettings from '../../lib/getDefaulListSettings';
import H1 from '../H1';
import InputIcon from '../InputIcon';
import PageTitle from '../PageTitle';
import ListRow from './ListRow';
import styles from './styles';

class List extends React.Component {
	render() {
		this.temp = 1;
		const {
			source,
			settings,
			settingsReplace,
			title,
			header,
			files,
			playlists,
			filesGetUrl,
			router,
		} = this.props;
		const { position, sortBy, sortDirection, search } =
			settings.lists[source] || getDefaulListSettings();
		const sourcedData = getSourcedData(files, source, playlists);
		const searchedData = getSearchedData(sourcedData, source, search);
		const sortedData = getSortedData(searchedData, sortBy, sortDirection);
		const saveListSettings = listSettings =>
			settingsReplace({
				...settings,
				lists: {
					...settings.lists,
					[source]: {
						...(settings.lists[source] || getDefaulListSettings()),
						...listSettings,
					},
				},
			});
		const onRowClick = arg => {
			const position = get(arg, 'index');
			const path = get(arg, 'rowData.path');

			if (source === 'playlists') {
				const slug = titleToSlug(get(playlists, `[${position}].name`));
				router.push(`/playlists/${slug}`);
			} else {
				filesGetUrl({ source, path, shouldPlay: true, position });
			}
		};
		const currentPath = get(settings, 'player.file.path');

		return (
			<div className="container">
				<PageTitle title={title} />
				<style jsx>{styles}</style>
				<div className="header">
					<H1>{header}</H1>
					<div className="controls">
						<Input
							prefix={<InputIcon icon="search" />}
							placeholder="Search"
							value={search}
							onChange={e => saveListSettings({ search: e.target.value })}
						/>
						{source !== 'playlists' && (
							<Button
								disabled={settings.player.source !== source}
								className="save"
								type="primary"
								onClick={() => {
									const file = get(this, 'props.settings.player.file', {});
									const currentIndex = sortedData.findIndex(
										({ path }) => path === file.path,
									);
									this.table.scrollToRow(currentIndex);
								}}
							>
								Current
							</Button>
						)}
					</div>
				</div>
				<div className={`table ${source}`}>
					<AutoSizer>
						{({ height, width }) => (
							<Table
								ref={c => {
									this.table = c;
								}}
								height={height}
								headerHeight={30}
								noRowsRenderer={() => (
									<div className="no-data">So empty *sigh*</div>
								)}
								rowRenderer={args => (
									<ListRow {...args} currentPath={currentPath} />
								)}
								rowCount={sortedData.length}
								rowGetter={({ index }) => sortedData[index]}
								rowHeight={26}
								scrollToIndex={position}
								width={width}
								sort={({ sortBy, sortDirection }) =>
									saveListSettings({
										sortBy,
										sortDirection: sortDirection === SortDirection.ASC,
									})
								}
								sortBy={sortBy}
								sortDirection={
									sortDirection ? SortDirection.ASC : SortDirection.DESC
								}
								onRowDoubleClick={onRowClick}
							>
								{getListColumns(source).map(({ title, dataKey }) => (
									<Column
										key={dataKey}
										label={title}
										dataKey={dataKey}
										width={1}
									/>
								))}
							</Table>
						)}
					</AutoSizer>
				</div>
			</div>
		);
	}
}

List.propTypes = {
	source: PropTypes.string.isRequired,
	files: PropTypes.array.isRequired,
	playlists: PropTypes.array.isRequired,
	settings: PropTypes.object.isRequired,
	settingsReplace: PropTypes.func.isRequired,
	filesGetUrl: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	header: PropTypes.string.isRequired,
	router: PropTypes.object.isRequired,
};

export default withRouter(
	connect(
		({ files, settings, playlists }) => ({
			files,
			settings,
			playlists,
		}),
		dispatch => ({
			settingsReplace: payload => dispatch(settingsReplace(payload)),
			filesGetUrl: payload => dispatch(filesGetUrl(payload)),
		}),
	)(List),
);
