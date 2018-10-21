import React from 'react';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { get } from 'lodash';
import getSortedData from '../../lib/getSortedData';
import getSearchedData from '../../lib/getSearchedData';
import getSourcedData from '../../lib/getSourcedData';
import { settingsReplace } from '../../actions/settings';
import { filesGetUrl } from '../../actions/files';
import getListColumns from '../../lib/getListColumns';
import { titleToSlug } from '../../lib/playlists';
import getDefaulListSettings from '../../lib/getDefaulListSettings';
import ListRow from './ListRow';
import styles from './styles';
import Page from '../Page';
import H1 from '../html/H1';
import { View, TextInput, Button } from '../rnw';
import { bps } from '../../lib/styling';
import DimensionsContext from '../DimensionsContext';
import Icon from '../Icon';

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

    return (
      <DimensionsContext.Consumer>
        {({ width }) => (
          <Page title={title}>
            <View style={[styles.top, width < bps.a3 ? styles.topA3 : {}]}>
              <H1>{header}</H1>
              <View style={styles.controls}>
                <TextInput
                  prefix={<Icon icon="search" />}
                  placeholder="Search"
                  value={search}
                  onChangeText={value => saveListSettings({ search: value })}
                />
                {source !== 'playlists' && (
                  <Button
                    title="Current"
                    icon="compass"
                    disabled={settings.player.source !== source}
                    onPress={() => {
                      const file = get(this, 'props.settings.player.file', {});
                      const currentIndex = sortedData.findIndex(
                        ({ path }) => path === file.path,
                      );
                      this.table.scrollToRow(currentIndex);
                    }}
                  />
                )}
              </View>
            </View>
            {/* <div className="table">
          <AutoSizer>
            {({ height, width }) => (
              <Table
                ref={c => {
                  this.table = c;
                }}
                onRowClick={onRowClick}
                height={height}
                headerHeight={30}
                noRowsRenderer={() => <div className="no-data">No rows!</div>}
                rowRenderer={args => (
                  <ListRow {...args} settings={settings} source={source} />
                )}
                rowCount={sortedData.length}
                rowGetter={({ index }) => sortedData[index]}
                rowHeight={26}
                scrollToIndex={position}
                width={width}
                rowStyle={{
                  grid: `none / ${getListColumns(source).reduce(
                    (a, v) => a + (v.width ? ` ${v.width}px` : ' 1fr'),
                    '',
                  )}`,
                  display: 'grid',
                }}
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
              >
                {getListColumns(source).map(({ title, dataKey, width }) => (
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
        </div> */}
          </Page>
        )}
      </DimensionsContext.Consumer>
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
