import React from 'react';
import PropTypes from 'prop-types';
import { View } from '../rnw';
import styles from './styles';
import Navigation from '../Navigation';
import DimensionsContext from '../DimensionsContext';
import { bps } from '../../lib/styling';
import CustomHead from '../CustomHead';

const Page = ({ children, title, horizontalPadding, verticalPadding }) => (
  <React.Fragment>
    <CustomHead title={title} />
    <DimensionsContext.Consumer>
      {({ width }) => (
        <View
          style={[styles.container, width < bps.a3 ? styles.containerA3 : {}]}
        >
          <Navigation />
          <View
            style={[
              styles.main,
              horizontalPadding
                ? width < bps.a3
                  ? styles.mainHorizontalPaddingA3
                  : styles.mainHorizontalPadding
                : {},
              verticalPadding
                ? width < bps.a3
                  ? styles.mainVerticalPaddingA3
                  : styles.mainVerticalPadding
                : {},
            ]}
          >
            {children}
          </View>
        </View>
      )}
    </DimensionsContext.Consumer>
  </React.Fragment>
);

Page.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  horizontalPadding: PropTypes.bool,
  verticalPadding: PropTypes.bool,
};

Page.defaultProps = {
  children: null,
  title: '',
  horizontalPadding: false,
  verticalPadding: false,
};

export default Page;
