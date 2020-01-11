import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Router from 'next/router';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
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
  const { lists, player, files, playlists, modifiers } = store;
  const { position, sortBy, sortDirection, search } =
    lists[source] || getDefaultListSettings(source);
  const sourcedData = getSourcedData(files, source, playlists);
  const searchedData = getSearchedData(sourcedData, source, search);
  const sortedData = getSortedData(searchedData, sortBy, sortDirection);
  const currentPath = get(player, 'file.path');
  const listRef = useRef(null);

  useEffect(() => {
    dispatch({ type: 'modifiers-show-update', payload: false });
    dispatch({ type: 'modifiers-selections-reset' });
  }, [dispatch]);

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
  const onRowClick = ({ rowData, index }) =>
    dispatch({
      type: 'modifiers-selections-toggle',
      payload:
        source === 'playlists'
          ? get(rowData, 'name')
          : ['video', 'audio'].includes(source)
          ? get(rowData, 'path')
          : index,
    });
  const onRowDoubleClick = ({ rowData, index }) => {
    const path = get(rowData, 'path');

    if (source === 'playlists') {
      const slug = titleToSlug(get(playlists, `[${index}].name`));
      Router.push('/playlists/[id]', `/playlists/${slug}`);
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
            size="small"
            css={styles.search}
            icon="search"
            placeholder="Search"
            value={search}
            onChange={e => saveListSettings({ search: e.target.value })}
          />
          {source !== 'playlists' && player.source === source && (
            <Button
              size="small"
              shape="circle"
              icon="location"
              onClick={() => {
                const file = get(player, 'file') || {};
                const currentIndex = sortedData.findIndex(
                  ({ path }) => path === file.path,
                );
                listRef.current.scrollToItem(currentIndex, 'center');
              }}
            />
          )}
          <Button
            size="small"
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
      <div css={styles.list}>
        <Modifiers source={source} store={store} dispatch={dispatch} />
        <Row
          {...{
            source,
            selections: modifiers.selections,
            columns: getListColumns(source),
            isHeader: true,
            sortBy,
            onClickColumn: key =>
              saveListSettings({
                sortBy: key,
                sortDirection: sortBy === key ? !sortDirection : true,
              }),
          }}
        />
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              ref={listRef}
              initialScrollOffset={position}
              height={height}
              width={width}
              itemCount={sortedData.length}
              itemSize={26}
              onScroll={({ scrollOffset }) =>
                saveListSettings({ position: scrollOffset })
              }
            >
              {({ style, index }) => (
                <Row
                  {...{
                    style,
                    index,
                    rowData: sortedData[index],
                    source,
                    selections: modifiers.selections,
                    currentPath,
                    columns: getListColumns(source),
                    onClick: onRowClick,
                    onDoubleClick: onRowDoubleClick,
                  }}
                />
              )}
            </FixedSizeList>
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
