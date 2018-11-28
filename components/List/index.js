import React from 'react';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import { get } from 'lodash';
import { Input } from 'antd';
import getSortedData from '../../lib/get-sorted-data';
import getSearchedData from '../../lib/get-searched-data';
import getSourcedData from '../../lib/get-sourced-data';
import { settingsReplace } from '../../actions/settings';
import { filesGetUrl } from '../../actions/files';
import {
  selectionsToggle,
  selectionsRemoveAll,
} from '../../actions/selections';
import getListColumns from '../../lib/get-list-columns';
import { titleToSlug } from '../../lib/playlists';
import getDefaulListSettings from '../../lib/get-default-list-settings';
import H1 from '../H1';
import InputIcon from '../InputIcon';
import IconButton from '../IconButton';
import Icon from '../Icon';
import PageTitle from '../PageTitle';
import ListRow from './ListRow';
import styles from './styles';

class List extends React.PureComponent {
  componentDidMount() {
    const { selectionsRemoveAll } = this.props;
    selectionsRemoveAll();
  }

  render() {
    const {
      source,
      settings,
      settingsReplace,
      title,
      header,
      files,
      playlists,
      filesGetUrl,
      selections,
      selectionsToggle,
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
    const onRowClick = arg =>
      selectionsToggle(
        source === 'playlists'
          ? get(arg, 'rowData.name')
          : get(arg, 'rowData.path'),
      );
    const onRowDoubleClick = arg => {
      const position = get(arg, 'index');
      const path = get(arg, 'rowData.path');

      if (source === 'playlists') {
        const slug = titleToSlug(get(playlists, `[${position}].name`));
        Router.push(`/playlists?id=${slug}`, `/playlists/${slug}`);
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
          <div className="side">
            <Input
              prefix={<InputIcon icon="search" />}
              placeholder="Search"
              value={search}
              onChange={e => saveListSettings({ search: e.target.value })}
            />
            {source !== 'playlists' && (
              <IconButton
                disabled={settings.player.source !== source}
                onClick={() => {
                  const file = get(this, 'props.settings.player.file', {});
                  const currentIndex = sortedData.findIndex(
                    ({ path }) => path === file.path,
                  );
                  this.table.scrollToRow(currentIndex);
                }}
              >
                <Icon icon="location" />
              </IconButton>
            )}
            {Boolean(selections.length) && (
              <IconButton
                onClick={() => {
                  console.log('show side panel!');
                }}
              >
                <Icon icon="switch" />
              </IconButton>
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
                rowRenderer={args => (
                  <ListRow
                    {...args}
                    currentPath={currentPath}
                    selections={selections}
                    source={source}
                  />
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
                onRowClick={onRowClick}
                onRowDoubleClick={onRowDoubleClick}
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
  selections: PropTypes.array.isRequired,
  selectionsToggle: PropTypes.func.isRequired,
  selectionsRemoveAll: PropTypes.func.isRequired,
};

export default connect(
  ({ files, settings, playlists, selections }) => ({
    files,
    settings,
    playlists,
    selections,
  }),
  dispatch => ({
    settingsReplace: payload => dispatch(settingsReplace(payload)),
    filesGetUrl: payload => dispatch(filesGetUrl(payload)),
    selectionsToggle: payload => dispatch(selectionsToggle(payload)),
    selectionsRemoveAll: () => dispatch(selectionsRemoveAll()),
  }),
)(List);
