import { useRef, useMemo, useCallback } from 'react';
import { get, throttle } from 'lodash';
import Router from 'next/router';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
// import Input from 'components/Input';
// import Button from 'components/Button';
// import H1 from 'components/H1';
import PageTitle from 'components/PageTitle';
import getSortedData from 'lib/get-sorted-data';
import getSearchedData from 'lib/get-searched-data';
// import getSourcedData from 'lib/get-sourced-data';
import getDefaultListSettings from 'lib/get-default-list-settings';
// import { titleToSlug } from 'lib/playlists';
// import { filesGetUrl } from 'lib/actions/files';
import getListColumns from 'lib/get-list-columns';
// import Row from './Row';
// import HeaderRow from './HeaderRow';
// import getStyles from './get-styles';

const throttledOnScroll = throttle((callback) => callback(), 10000, {
  trailing: true,
});

const List = ({ title, header, source, store, dispatch }) => {
  // const { lists, player, files, playlists } = store;
  // const { position, sortBy, sortDirection, search } =
  //   lists[source] || getDefaultListSettings(source);
  // const sourcedData = useMemo(() => getSourcedData(files, source, playlists), [
  //   files,
  //   source,
  //   playlists,
  // ]);
  // const searchedData = useMemo(
  //   () => getSearchedData(sourcedData, source, search),
  //   [sourcedData, source, search],
  // );
  // const sortedData = useMemo(
  //   () => getSortedData(searchedData, sortBy, sortDirection),
  //   [searchedData, sortBy, sortDirection],
  // );
  // const currentPath = player.file.path;
  // const listRef = useRef(null);
  // const dimensions = useWindowDimensions();
  // const styles = useMemo(() => getStyles(dimensions), [dimensions]);
  // const isPlaylist = useMemo(
  //   () => !['video', 'audio', 'playlists', 'recent'].includes(source),
  //   [source],
  // );

  // const saveListSettings = useCallback(
  //   (listSettings) =>
  //     dispatch({
  //       type: 'lists-update',
  //       payload: [
  //         source,
  //         {
  //           ...(lists[source] || getDefaultListSettings(source)),
  //           ...listSettings,
  //         },
  //       ],
  //     }),
  //   [dispatch, lists, source],
  // );
  // const itemData = useMemo(
  //   () => ({
  //     dispatch,
  //     sortedData,
  //     source,
  //     currentPath,
  //     columns: getListColumns(source),
  //     onRowClick: ({ rowData, index }) => {
  //       const path = get(rowData, 'path');

  //       if (source === 'playlists') {
  //         const slug = titleToSlug(get(playlists, `[${index}].name`));
  //         Router.push('/playlists/[id]', `/playlists/${slug}`);
  //       } else {
  //         filesGetUrl({
  //           dispatch,
  //           store,
  //           source,
  //           path,
  //           shouldPlay: true,
  //         });
  //       }
  //     },
  //     onOptionsClick: ({ rowData, index }) =>
  //       dispatch({
  //         type: 'options-start',
  //         payload: [
  //           'item',
  //           rowData.path,
  //           { playlist: isPlaylist && source, index },
  //         ],
  //       }),
  //     isPlaylist,
  //   }),
  //   [store, playlists, isPlaylist, dispatch, source, sortedData, currentPath],
  // );

  return <div>hello</div>;

  // return (
  //   <View style={styles.root}>
  //     <PageTitle title={title} />
  //     <View style={styles.header}>
  //       <H1 style={styles.h1}>{header}</H1>
  //       <View style={styles.side}>
  //         <Input
  //           size="small"
  //           style={styles.search}
  //           icon="search"
  //           placeholder="Search"
  //           value={search}
  //           onChangeText={(text) => saveListSettings({ search: text })}
  //         />
  //         {source !== 'playlists' && player.source === source && (
  //           <Button
  //             shape="circle"
  //             icon="location"
  //             onPress={() => {
  //               const file = get(player, 'file') || {};
  //               const currentIndex = sortedData.findIndex(
  //                 ({ path }) => path === file.path,
  //               );
  //               listRef.current.scrollToItem(currentIndex, 'center');
  //             }}
  //           />
  //         )}
  //         <Button
  //           shape="circle"
  //           icon="options"
  //           onPress={() =>
  //             dispatch({ type: 'options-start', payload: ['source', source] })
  //           }
  //         />
  //       </View>
  //     </View>
  //     <View style={styles.table}>
  //       <HeaderRow
  //         {...{
  //           dispatch,
  //           sortedData,
  //           source,
  //           currentPath,
  //           columns: getListColumns(source),
  //           isPlaylist: !['video', 'audio', 'playlists', 'recent'].includes(
  //             source,
  //           ),
  //           sortBy,
  //           onClickColumn: (key) =>
  //             saveListSettings({
  //               sortBy: key,
  //               sortDirection: sortBy === key ? !sortDirection : true,
  //             }),
  //         }}
  //       />
  //       <View>
  //         <AutoSizer>
  //           {({ height, width }) => (
  //             <FixedSizeList
  //               ref={listRef}
  //               initialScrollOffset={position}
  //               style={styles.items}
  //               height={height}
  //               width={width}
  //               itemCount={sortedData.length}
  //               itemSize={26}
  //               itemData={itemData}
  //               onScroll={({ scrollOffset }) =>
  //                 throttledOnScroll(() =>
  //                   saveListSettings({ position: scrollOffset }),
  //                 )
  //               }
  //             >
  //               {Row}
  //             </FixedSizeList>
  //           )}
  //         </AutoSizer>
  //       </View>
  //     </View>
  //   </View>
  // );
};

export default List;
