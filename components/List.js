import React from 'react';
import {
  AutoSizer,
  Column,
  SortDirection,
  Table,
  defaultTableRowRenderer,
} from 'react-virtualized';
import { Input, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEqual } from 'lodash';
import style from '../styles/list';
import CustomHead from '../components/CustomHead';
import getSortedData from '../lib/getSortedData';
import { cloudSaveOther } from '../actions/cloud';
import { settingsReplace } from '../actions/settings';
import { filesGetUrl } from '../actions/files';
import fileColumns from '../lib/fileColumns';
import fileSearchKeys from '../lib/fileSearchKeys';

class List extends React.Component {
  state = {
    search: '',
  };
  goToCurrentPosition() {
    const { files, settings } = this.props;
    const { player: { file, source } } = settings;
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
      settings,
      settingsReplaceAndCloudSaveOther,
      filesGetUrl,
      title,
      header,
    } = this.props;
    const playerSource = get(settings, 'player.source');
    const { position, sortBy, sortDirection } = settings[source];
    const { search } = this.state;
    const searchedData = search
      ? files[source].filter(file =>
          fileSearchKeys[source].find(
            key => file[key].toLowerCase().indexOf(search.toLowerCase()) !== -1,
          ),
        )
      : files[source];
    const sortedData = getSortedData(searchedData, sortBy, sortDirection);
    const { player: { file: { path: currentPath } } } = settings;

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
        </div>
        <div className="table">
          <AutoSizer>
            {({ height, width }) => (
              <Table
                ref={c => {
                  this.table = c;
                }}
                onRowClick={({ index: position, rowData: { path } }) =>
                  filesGetUrl({ source, path, shouldPlay: true, position })
                }
                height={height}
                headerHeight={30}
                noRowsRenderer={() => <div className="no-files">No files</div>}
                rowRenderer={arg => {
                  const { rowData: { path }, className } = arg;
                  const newClassName = `${className} ${
                    path === currentPath ? 'active' : ''
                  }`;
                  return defaultTableRowRenderer({
                    ...arg,
                    className: newClassName,
                  });
                }}
                rowCount={sortedData.length}
                rowGetter={({ index }) => sortedData[index]}
                rowHeight={26}
                scrollToIndex={position}
                width={width}
                rowStyle={{
                  // prettier-ignore
                  grid: `none / ${
                  fileColumns[source].reduce(
                    (a, v) => a + (v.width ? ` ${v.width}px` : ' 1fr'),
                    '',
                  )}`
                }}
                sort={({ sortBy, sortDirection }) =>
                  settingsReplaceAndCloudSaveOther({
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
                {fileColumns[source].map(({ title, dataKey, width }) => (
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
      </div>
    );
  }
}

List.propTypes = {
  source: PropTypes.string.isRequired,
  files: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  settingsReplaceAndCloudSaveOther: PropTypes.func.isRequired,
  filesGetUrl: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
};

export default connect(
  ({ files, settings }) => ({ files, settings }),
  dispatch => ({
    settingsReplaceAndCloudSaveOther: payload => {
      dispatch(settingsReplace(payload));
      dispatch(cloudSaveOther());
    },
    filesGetUrl: payload => dispatch(filesGetUrl(payload)),
  }),
)(List);
