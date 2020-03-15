import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { get, throttle } from 'lodash';
import Router from 'next/router';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { useWindowDimensions, View } from 'react-native';
import Input from '../Input';
import Button from '../Button';
import H1 from '../H1';
import PageTitle from '../PageTitle';
import getSortedData from '../../lib/get-sorted-data';
import getSearchedData from '../../lib/get-searched-data';
import getSourcedData from '../../lib/get-sourced-data';
import getDefaultListSettings from '../../lib/get-default-list-settings';
import { titleToSlug } from '../../lib/playlists';
import { filesGetUrl } from '../../lib/actions/files';
import getListColumns from '../../lib/get-list-columns';
import Row from './Row';
import Modifiers from '../Modifiers';
import getStyles from './get-styles';

const throttledOnScroll = throttle(callback => callback(), 10000, {
  trailing: true,
});

const List = ({ title, header, source, store, dispatch }) => {
  const { lists, player, files, playlists, modifiers } = store;
  const { position, sortBy, sortDirection, search } = useMemo(
    () => lists[source] || getDefaultListSettings(source),
    [lists, source],
  );
  const sourcedData = useMemo(() => getSourcedData(files, source, playlists), [
    files,
    source,
    playlists,
  ]);
  const searchedData = useMemo(
    () => getSearchedData(sourcedData, source, search),
    [sourcedData, source, search],
  );
  const sortedData = useMemo(
    () => getSortedData(searchedData, sortBy, sortDirection),
    [searchedData, sortBy, sortDirection],
  );
  const currentPath = player.file.path;
  const listRef = useRef(null);
  const dimensions = useWindowDimensions();
  const styles = useMemo(() => getStyles(dimensions), [dimensions]);

  useEffect(() => {
    dispatch({ type: 'modifiers-show-update', payload: false });
    dispatch({ type: 'modifiers-selections-reset' });
  }, [dispatch]);

  const saveListSettings = useCallback(
    listSettings =>
      dispatch({
        type: 'lists-update',
        payload: [
          source,
          {
            ...(lists[source] || getDefaultListSettings(source)),
            ...listSettings,
          },
        ],
      }),
    [dispatch, lists, source],
  );
  const onRowClick = useCallback(
    ({ rowData, index }) => {
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
    },
    [source, dispatch, store, playlists],
  );

  return (
    <View style={styles.root}>
      <PageTitle title={title} />
      <View style={styles.header}>
        <H1 style={styles.h1}>{header}</H1>
        <View style={styles.side}>
          <Input
            size="small"
            style={styles.search}
            icon="search"
            placeholder="Search"
            value={search}
            onChangeText={text => saveListSettings({ search: text })}
          />
          {source !== 'playlists' && player.source === source && (
            <Button
              size="small"
              shape="circle"
              icon="location"
              onPress={() => {
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
            onPress={() =>
              dispatch({
                type: 'modifiers-show-update',
                payload: !modifiers.show,
              })
            }
          />
        </View>
      </View>
      <View style={styles.table}>
        <Modifiers {...{ source, dispatch, store }} />
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
        <View>
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
                  throttledOnScroll(() =>
                    saveListSettings({ position: scrollOffset }),
                  )
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
                      onPress: onRowClick,
                    }}
                  />
                )}
              </FixedSizeList>
            )}
          </AutoSizer>
        </View>
      </View>
    </View>
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
