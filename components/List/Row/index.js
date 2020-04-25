import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useWindowDimensions, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { merge } from 'lodash';
import Button from '../../Button';
import Text from '../../Text';
import Icon from '../../Icon';
import computedStyles from './computed-styles';
import { getCurrentStyles } from '../../../lib/styling';

const Row = ({
  style,
  index,
  rowData,
  source,
  currentPath,
  columns,
  onPress,
  onClickColumn,
  isHeader,
  sortBy,
  dispatch,
}) => {
  const dimensions = useWindowDimensions();
  const styles = useMemo(() => getCurrentStyles(dimensions, computedStyles), [
    dimensions,
  ]);
  const Container = useMemo(() => (onPress ? TouchableOpacity : View), [
    onPress,
  ]);
  const isPlaylist = useMemo(
    () => !['video', 'audio', 'playlists', 'recent'].includes(source),
    [source],
  );
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

  return (
    <Container
      style={merge(
        {},
        style,
        styles.root,
        index % 2 ? styles.rootOdd : {},
        isHeader ? styles.rootHeader : {},
        source === 'playlists' ? styles.rootPlaylists : {},
        source === 'video' ? styles.rootVideo : {},
        source === 'recent' ? styles.rootRecent : {},
        rowData.path === currentPath ? styles.rootActive : {},
      )}
      onPress={onContainerPress}
    >
      {columns.map(({ key, title }) => (
        <Text
          key={key}
          style={merge({}, styles.column, isHeader ? styles.columnHeader : {})}
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
};

Row.propTypes = {
  columns: PropTypes.array.isRequired,
  index: PropTypes.number,
  onPress: PropTypes.func,
  onClickColumn: PropTypes.func,
  rowData: PropTypes.any,
  style: PropTypes.any,
  currentPath: PropTypes.string,
  source: PropTypes.string.isRequired,
  isHeader: PropTypes.bool,
  sortBy: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

Row.defaultProps = {
  currentPath: '',
  style: {},
  isHeader: false,
  rowData: {},
  onPress: undefined,
  onClickColumn: undefined,
  index: null,
  sortBy: undefined,
};

export default Row;
