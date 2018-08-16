import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import Player from '../components/Player';
import Navigation from '../components/Navigation';
import LoadingBar from '../components/LoadingBar';
import rootStyle from '../styles/root';
import { draggingUpdate } from '../actions/dragging';

const Root = ({ children, draggingUpdate }) => (
  <div className="root">
    <style jsx>{rootStyle}</style>
    <LoadingBar />
    <DragDropContext
      onDragStart={() => draggingUpdate({ isDragging: true })}
      onDragEnd={() => draggingUpdate({ isDragging: false })}
    >
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
  draggingUpdate: PropTypes.func.isRequired,
};

Root.defaultProps = {
  children: null,
};

export default connect(
  null,
  dispatch => ({
    draggingUpdate: payload => dispatch(draggingUpdate(payload)),
  }),
)(Root);
