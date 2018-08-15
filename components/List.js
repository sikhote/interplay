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
import ListRow from './ListRow';

class List extends React.Component {
  state = {
    search: '',
  };
  onRowClick(arg) {
    const position = get(arg, 'index');
    const path = get(arg, 'rowData.path');
    const {
      source,
      playlists: { playlists },
      filesGetUrl,
      router,
    } = this.props;

    switch (source) {
      case 'playlists': {
        const slug = titleToSlug(get(playlists, `[${position}].name`));
        router.push(`/playlists/${slug}`);
        break;
      }
      case 'playlist': {
        console.log('helllo play me');
        break;
      }
      default:
        filesGetUrl({ source, path, shouldPlay: true, position });
    }
  }
  getRowRenderer(arg) {
    const { settings, source } = this.props;
    const currentPath = get(settings, 'player.file.path');
    const path = get(arg, 'rowData.path');
    const className = get(arg, 'className');
    const newClassName = `${className} ${path === currentPath ? 'active' : ''}`;
    const newArg = { ...arg, key: path };
    let key;

    switch (source) {
      case 'playlists':
        newArg.className = newClassName;
        key = get(arg, 'rowData.name');
        break;
      default:
        key = path
    }

    return <ListRow {...newArg} key={key} />;
  }
  goToCurrentPosition() {
    const { files, settings } = this.props;
    const {
      player: { file, source },
    } = settings;
    const { sortBy, sortDirection } = settings[source];
    const data = files[source];
    const sortedData = getSortedData(data, sortBy, sortDirection);
    const currentIndex = sortedData.findIndex(({ path }) => path === file.path);
    this.table.scrollToRow(currentIndex);
  }
  render() {
    const {
      source,
      files,
      playlists: { playlists },
      settings,
      settingsReplace,
      title,
      header,
    } = this.props;
    const playerSource = get(settings, 'player.source');
    const { search } = this.state;
    let position;
    let sortBy;
    let sortDirection;
    let data;

    switch (source) {
      case 'playlists':
        data = playlists.map(({ created, updated, tracks, ...rest }) => ({
          ...rest,
          created: moment(created).format('YYYY-M-D'),
          updated: moment(updated).format('YYYY-M-D'),
          tracks: tracks.length,
        }));
        ({ position, sortBy, sortDirection } = this.state);
        break;
      case 'playlist':
        data = [];
        ({ position, sortBy, sortDirection } = this.state);
        break;
      default: {
        data = files[source];
        ({ position, sortBy, sortDirection } = get(
          settings,
          `[${source}]`,
          {},
        ));
      }
    }

    const searchedData = search
      ? data.filter(entry =>
          listSearchKeys[source].find(
            key =>
              entry[key].toLowerCase().indexOf(search.toLowerCase()) !== -1,
          ),
        )
      : data;
    const sortedData = getSortedData(searchedData, sortBy, sortDirection);

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
              onChange={e => this.setState({ search: e.target.value })}
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
        <Droppable droppableId="droppable" isDropDisabled>
          {provided => (
            <div className="table" ref={provided.innerRef}>
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
                    rowRenderer={arg => this.getRowRenderer(arg)}
                    rowCount={sortedData.length}
                    rowGetter={({ index }) => sortedData[index]}
                    rowHeight={26}
                    scrollToIndex={position}
                    width={width}
                    rowStyle={{
                      // prettier-ignore
                      grid: `none / ${
                  listColumns[source].reduce(
                    (a, v) => a + (v.width ? ` ${v.width}px` : ' 1fr'),
                    '',
                  )}`
                    }}
                    sort={({ sortBy, sortDirection }) =>
                      settingsReplace({
                        ...settings,
                        [source]: {
                          ...settings[source],
                          sortBy,
                          sortDirection: sortDirection === SortDirection.ASC,
                        },
                      })
                    }
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
    ({ files, settings, playlists }) => ({ files, settings, playlists }),
    dispatch => ({
      settingsReplace: payload => dispatch(settingsReplace(payload)),
      filesGetUrl: payload => dispatch(filesGetUrl(payload)),
    }),
  )(List),
);
