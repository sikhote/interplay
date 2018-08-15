import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import Player from '../components/Player';
import Navigation from '../components/Navigation';
import LoadingBar from '../components/LoadingBar';
import rootStyle from '../styles/root';

const Root = ({ children }) => (
  <div className="root">
    <style jsx>{rootStyle}</style>
    <LoadingBar />
    <DragDropContext onDragEnd={() => console.log('drop')}>
      <div className="container">
        <div className="navigation">
          <Navigation />
        </div>
        <div className="main">
          <Player />
          {children}
        </div>
      </div>
    </DragDropContext>
  </div>
);

Root.propTypes = {
  children: PropTypes.any,
};

Root.defaultProps = {
  children: null,
};

export default Root;
