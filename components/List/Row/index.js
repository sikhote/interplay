import React, { useCallback, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../../Button';
import Text from '../../Text';
import Icon from '../../Icon';

const Row = memo(({ style, index, data }) => {
  const {
    sortedData = [],
    source,
    currentPath = '',
    columns,
    onPress,
    onClickColumn,
    isHeader = false,
    sortBy,
    dispatch,
    styles,
    isPlaylist,
    Container,
  } = data;
  const rowData = sortedData[index] || {};
  const onContainerPress = useCallback(() => onPress({ index, rowData }), [
    index,
    rowData,
    onPress,
  ]);
  const onOptionsPress = useCallback(
    () =>
      dispatch({
        type: 'options-start',
        payload: [
          'item',
          rowData.path,
          { playlist: isPlaylist && source, index },
        ],
      }),
    [dispatch, rowData.path, isPlaylist, source, index],
  );
  const containerStyle = useMemo(
    () =>
      Object.assign(
        style,
        styles.root,
        index % 2 ? styles.rootOdd : {},
        isHeader ? styles.rootHeader : {},
        source === 'playlists' ? styles.rootPlaylists : {},
        source === 'video' ? styles.rootVideo : {},
        source === 'recent' ? styles.rootRecent : {},
        rowData.path === currentPath ? styles.rootActive : {},
      ),
    [
      style,
      styles.root,
      styles.rootOdd,
      styles.rootHeader,
      styles.rootPlaylists,
      styles.rootVideo,
      styles.rootRecent,
      styles.rootActive,
      source,
      index,
      rowData,
      currentPath,
      isHeader,
    ],
  );
  const columnStyle = useMemo(
    () => Object.assign({}, styles.column, isHeader ? styles.columnHeader : {}),
    [styles.column, styles.columnHeader, isHeader],
  );

  return (
    <Container style={containerStyle} onPress={onContainerPress}>
      {columns.map(({ key, title }) => (
        <Text
          key={key}
          style={columnStyle}
          {...(isHeader
            ? {
                color: sortBy === key ? 'text' : 'textFaded',
                fontWeight: 'bold',
                fontSize: 'b',
                onClick: () => onClickColumn(key),
              }
            : {})}
        >
          {isHeader
            ? title
            : key === 'dateAdded'
            ? moment(rowData[key]).format('YYYY/MM/DD HH:mm:ss')
            : rowData[key]}
          {isHeader && sortBy === key && (
            <Text color="text" fontSize="a">
              <Icon fontSize="a" icon="sort" />
            </Text>
          )}
        </Text>
      ))}
      {isHeader ? (
        <div />
      ) : (
        <Button
          isEnclosed={false}
          theme="subtle"
          size="small"
          shape="circle"
          icon="options"
          onPress={onOptionsPress}
        />
      )}
    </Container>
  );
});

Row.propTypes = {
  index: PropTypes.number,
  style: PropTypes.any,
  data: PropTypes.object,
};

Row.defaultProps = {
  index: null,
  style: {},
  data: {},
};

export default Row;
