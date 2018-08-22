import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Droppable } from 'react-beautiful-dnd';
import css from '../styles/navigation';
import { playlistsAdd } from '../actions/playlists';
import { titleToSlug } from '../lib/playlists';

const Navigation = ({ router, playlists, isDragging }) => {
  const alpha = get(router.query, 'alpha');
  const path = `${router.pathname}${alpha ? `/${alpha}` : ''}`;

  return (
    <div className="root">
      <style jsx>{css}</style>
      {[
        { key: '/', title: 'Settings', icon: 'cog' },
        { key: '/audio', title: 'Files', icon: 'list' },
        {
          key: '/playlists',
          title: 'Playlists',
          icon: 'star',
          className: ' playlists',
        },
        ...playlists.map(({ name }) => ({
          key: `/playlists/${titleToSlug(name)}`,
          title: name,
          icon: 'star',
          className: ` playlist${isDragging ? ' is-droppable' : ''}`,
          droppable: true,
        })),
      ].map(({ key, title, icon, className = '', droppable }, index) => (
        <Droppable key={key} droppableId={title} isDropDisabled={!droppable}>
          {(provided, { isDraggingOver }) => {
            let newClassName = `${className} item`;
            newClassName += isDraggingOver ? ' is-dropping' : '';
            newClassName += key === path ? ' active' : '';

            return (
              <div
                role="button"
                tabIndex={index}
                onClick={() => router.push(key)}
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={newClassName}
              >
                <div className="inner">
                  <i className={`icon-${icon}`} />
                  {title}
                </div>
              </div>
            );
          }}
        </Droppable>
      ))}
    </div>
  );
};

Navigation.propTypes = {
  router: PropTypes.object.isRequired,
  playlists: PropTypes.array.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default withRouter(
  connect(
    ({ playlists, dragging }) => ({
      playlists: playlists.playlists,
      isDragging: dragging.isDragging,
    }),
    dispatch => ({
      playlistsAdd: payload => dispatch(playlistsAdd(payload)),
    }),
  )(Navigation),
);
