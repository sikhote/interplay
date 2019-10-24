import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Router from 'next/router';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import Input from '../Input';
import Button from '../Button';
import H1 from '../H1';
import Modifiers from '../Modifiers';
import PageTitle from '../PageTitle';
import getSortedData from '../../lib/get-sorted-data';
import getSearchedData from '../../lib/get-searched-data';
import getSourcedData from '../../lib/get-sourced-data';
import getDefaultListSettings from '../../lib/get-default-list-settings';
import { titleToSlug } from '../../lib/playlists';
import { filesGetUrl } from '../../lib/actions/files';
import getListColumns from '../../lib/get-list-columns';
import Row from './Row';
import styles from './styles';

const List = ({ title, header, source, store, dispatch }) => {
  const tableRef = useRef(null);
  const { lists, player, files, playlists, modifiers } = store;
  const { position, sortBy, sortDirection, search } =
    lists[source] || getDefaultListSettings(source);
  const sourcedData = getSourcedData(files, source, playlists);
  const searchedData = getSearchedData(sourcedData, source, search);
  const sortedData = getSortedData(searchedData, sortBy, sortDirection);
  const currentPath = get(player, 'file.path');
  const saveListSettings = listSettings =>
    dispatch({
      type: 'lists-update',
      payload: [
        source,
        {
          ...(lists[source] || getDefaultListSettings(source)),
          ...listSettings,
        },
      ],
    });
  const onRowClick = arg =>
    dispatch({
      type: 'modifiers-selections-toggle',
      payload:
        source === 'playlists'
          ? get(arg, 'rowData.name')
          : ['video', 'audio'].includes(source)
          ? get(arg, 'rowData.path')
          : arg.index,
    });
  const onRowDoubleClick = arg => {
    const position = get(arg, 'index');
    const path = get(arg, 'rowData.path');

    if (source === 'playlists') {
      const slug = titleToSlug(get(playlists, `[${position}].name`));
      Router.push(`/playlists?id=${slug}`, `/playlists/${slug}`);
    } else {
      filesGetUrl({
        dispatch,
        store,
        source,
        path,
        shouldPlay: true,
      });
    }
  };

  return (
    <div css={styles.root}>
      <PageTitle title={title} />
      <div css={styles.header}>
        <H1 css={styles.h1}>{header}</H1>
        <div css={styles.side}>
          <Input
            css={styles.search}
            icon="search"
            placeholder="Search"
            value={search}
            onChange={e => saveListSettings({ search: e.target.value })}
          />
          {source !== 'playlists' && player.source === source && (
            <Button
              shape="circle"
              icon="location"
              onClick={() => {
                const file = get(player, 'file') || {};
                const currentIndex = sortedData.findIndex(
                  ({ path }) => path === file.path,
                );
                console.log(tableRef);
                tableRef.scrollToRow(currentIndex);
              }}
            />
          )}
          <Button
            shape="circle"
            icon="switch"
            onClick={() =>
              dispatch({
                type: 'modifiers-show-update',
                payload: !modifiers.show,
              })
            }
          />
        </div>
      </div>
      <div css={styles.tableContainer}>
        <Modifiers source={source} store={store} dispatch={dispatch} />
        <AutoSizer>
          {({ height, width }) => (
            <Table
              ref={tableRef}
              height={height}
              headerHeight={30}
              headerRowRenderer={args => (
                <Row {...args} isHeader source={source} />
              )}
              rowRenderer={args => (
                <Row
                  {...args}
                  currentPath={currentPath}
                  selections={modifiers.selections}
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
};

List.propTypes = {
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default List;
