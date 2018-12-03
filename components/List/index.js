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
  modifiersSelectionsToggle,
  modifiersSelectionsRemoveAll,
  modifiersShowUpdate,
} from '../../actions/modifiers';
import getListColumns from '../../lib/get-list-columns';
import { titleToSlug } from '../../lib/playlists';
import getDefaulListSettings from '../../lib/get-default-list-settings';
import H1 from '../H1';
import InputIcon from '../InputIcon';
import IconButton from '../IconButton';
import Icon from '../Icon';
import PageTitle from '../PageTitle';
import Modifiers from '../Modifiers';
import ListRow from './ListRow';
import styles from './styles';

class List extends React.PureComponent {
  componentDidMount() {
    const { modifiersSelectionsRemoveAll, modifiersShowUpdate } = this.props;
    modifiersSelectionsRemoveAll();
    modifiersShowUpdate(false);
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
      modifiersSelections,
      modifiersSelectionsToggle,
      modifiersSelectionsRemoveAll,
      modifiersShowUpdate,
      modifiersShow,
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
      modifiersSelectionsToggle(
        source === 'playlists'
          ? get(arg, 'rowData.name')
          : ['video', 'audio'].includes(source)
          ? get(arg, 'rowData.path')
          : arg.index,
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
              className="search"
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
            {Boolean(modifiersSelections.length) && (
              <IconButton
                onClick={() => {
                  modifiersSelectionsRemoveAll();
                  modifiersShowUpdate(false);
                }}
              >
                <Icon icon="cancel" />
              </IconButton>
            )}
            {Boolean(modifiersSelections.length) && (
              <IconButton onClick={() => modifiersShowUpdate(!modifiersShow)}>
                <Icon icon="switch" />
              </IconButton>
            )}
          </div>
        </div>
        <div className={`table ${source}`}>
          <Modifiers source={source} />
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
                    selections={modifiersSelections}
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
  modifiersSelections: PropTypes.array.isRequired,
  modifiersSelectionsToggle: PropTypes.func.isRequired,
  modifiersSelectionsRemoveAll: PropTypes.func.isRequired,
  modifiersShowUpdate: PropTypes.func.isRequired,
  modifiersShow: PropTypes.bool.isRequired,
};

export default connect(
  ({ files, settings, playlists, modifiers }) => ({
    files,
    settings,
    playlists,
    modifiersShow: modifiers.show,
    modifiersSelections: modifiers.selections,
  }),
  dispatch => ({
    settingsReplace: payload => dispatch(settingsReplace(payload)),
    filesGetUrl: payload => dispatch(filesGetUrl(payload)),
    modifiersSelectionsToggle: payload =>
      dispatch(modifiersSelectionsToggle(payload)),
    modifiersSelectionsRemoveAll: () =>
      dispatch(modifiersSelectionsRemoveAll()),
    modifiersShowUpdate: payload => dispatch(modifiersShowUpdate(payload)),
  }),
)(List);
