import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';

const Navigation = ({ router }) => (
  <Menu
    onClick={({ key }) => router.push(key)}
    selectedKeys={[router.pathname]}
    mode="inline"
    theme="dark"
  >
    {[
      { key: '/', icon: 'caret-right', message: 'Player' },
      { key: '/audio', icon: 'notification', message: 'Audio' },
      { key: '/video', icon: 'video-camera', message: 'Video' },
      { key: '/settings', icon: 'setting', message: 'Settings' },
    ].map(({ key, icon, message }) => (
      <Menu.Item key={key}>
        <Icon type={icon} /> {message}
      </Menu.Item>
    ))}
  </Menu>
);

Navigation.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(Navigation);
