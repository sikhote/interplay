import React from 'react';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import { Input, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import moment from 'moment';
import { get } from 'lodash';
import { Droppable } from 'react-beautiful-dnd';
import style from '../styles/list';
import CustomHead from './CustomHead';
import getSortedData from '../lib/getSortedData';
import { settingsReplace } from '../actions/settings';
import { filesGetUrl } from '../actions/files';
import listColumns from '../lib/listColumns';
import listSearchKeys from '../lib/listSearchKeys';
import { titleToSlug } from '../lib/playlists';
import getDefaulListSettings from '../lib/getDefaulListSettings';
import ListRow from './ListRow';

class List extends React.Component {
  constructor(props) {
    super(props);

    const {
      source,
      files,
      playlists: { playlists },
    } = props;

    let data;

    switch (source) {
      case 'playlists':
        data = playlists.map(({ created, updated, tracks, ...rest }) => ({
          ...rest,
          created: moment(created).format('YYYY-M-D'),
          updated: moment(updated).format('YYYY-M-D'),
          tracks: tracks.length,
        }));
        break;
      case 'video':
      case 'audio':
        data = files.filter(({ type }) => type === 'source');
        break;
      // Playlists
      default: {
        data = [];
      }
    }

    this.state = {
      search: '',
      data,
      searchedData: data,
      sortedData: data,
    };
  }
  onRowClick(arg) {
    const position = get(arg, 'index');
    const path = get(arg, 'rowData.path');
    const {
      source,
      playlists: { playlists },
      filesGetUrl,
      router,
    } = this.props;

    if (source === 'playlists') {
      const slug = titleToSlug(get(playlists, `[${position}].name`));
      router.push(`/playlists/${slug}`);
    } else {
      filesGetUrl({ source, path, shouldPlay: true, position });
    }
  }
  getRowRenderer(arg) {
    const { settings, source } = this.props;
    const currentPath = get(settings, 'player.file.path');
    const path = get(arg, 'rowData.path');
    const className = get(arg, 'className');
    const newArg = {
      ...arg,
      key: path,
      className: `${className} ${path === currentPath ? 'active' : ''}`,
    };

    switch (source) {
      case 'playlists':
        newArg.key = get(arg, 'rowData.name');
        newArg.className = get(arg, 'className');
        break;
      default:
        break;
    }

    return <ListRow {...newArg} />;
  }
  setSearchedData() {
    const { source, settings } = this.props;
    const { search, data } = this.state;
    const { sortBy, sortDirection } =
      settings.lists[source] || getDefaulListSettings();
    const searchKeys = listSearchKeys[source] || listSearchKeys.playlists;
    const searchedData = search
      ? data.filter(entry =>
          searchKeys[source].find(
            key =>
              entry[key].toLowerCase().indexOf(search.toLowerCase()) !== -1,
          ),
        )
      : data;

    this.setState({ searchedData }, () =>
      this.setSortedData({ sortBy, sortDirection }),
    );
  }
  setSortedData({ sortBy, sortDirection }) {
    const { searchedData } = this.state;
    const sortedData = getSortedData(searchedData, sortBy, sortDirection);
    this.setState({ sortedData });
  }
  goToCurrentPosition() {
    const { sortedData } = this.state;
    const { settings } = this.props;
    const {
      player: { file },
    } = settings;
    const currentIndex = sortedData.findIndex(({ path }) => path === file.path);
    this.table.scrollToRow(currentIndex);
  }
  render() {
    const { source, settings, settingsReplace, title, header } = this.props;
    const playerSource = get(settings, 'player.source');
    const { search, sortedData } = this.state;
    const { position, sortBy, sortDirection } =
      settings.lists[source] || getDefaulListSettings();

    return (
      <div className="root">
        <style jsx>{style}</style>
        <CustomHead title={title} />
        <h1 className="header">{header}</h1>
        <div className="controls">
          <div className="search">
            <Input
              size="small"
              addonBefore={<Icon type="search" />}
              placeholder="Search"
              value={search}
              onChange={e =>
                this.setSearch({ search: e.target.value }, () =>
                  this.setSearchedData(),
                )
              }
            />
          </div>
          {(source === 'video' || source === 'audio') && (
            <div>
              <Button
                disabled={playerSource !== source}
                icon="compass"
                onClick={() => this.goToCurrentPosition()}
                size="small"
              >
                Current
              </Button>
            </div>
          )}
        </div>
        <Droppable droppableId="droppable">
          {provided => (
            <div className={`table ${source}`} ref={provided.innerRef}>
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    ref={c => {
                      this.table = c;
                    }}
                    onRowClick={arg => this.onRowClick(arg)}
                    height={height}
                    headerHeight={30}
                    noRowsRenderer={() => (
                      <div className="no-data">No rows!</div>
                    )}
                    rowRenderer={args => (
                      <ListRow {...args} settings={settings} source={source} />
                    )}
                    rowCount={sortedData.length}
                    rowGetter={({ index }) => sortedData[index]}
                    rowHeight={26}
                    scrollToIndex={position}
                    width={width}
                    sort={({ sortBy, sortDirection }) => {
                      this.setSortedData({ sortBy, sortDirection });
                      settingsReplace({
                        ...settings,
                        [source]: {
                          ...settings[source],
                          sortBy,
                          sortDirection: sortDirection === SortDirection.ASC,
                        },
                      });
                    }}
                    sortBy={sortBy}
                    sortDirection={
                      sortDirection ? SortDirection.ASC : SortDirection.DESC
                    }
                  >
                    {listColumns[source].map(({ title, dataKey, width }) => (
                      <Column
                        key={title}
                        label={title}
                        dataKey={dataKey}
                        width={width || 100}
                      />
                    ))}
                  </Table>
                )}
              </AutoSizer>
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

List.propTypes = {
  source: PropTypes.string.isRequired,
  files: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
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
