import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import routes from '../lib/routes';

const Navigation = ({ router }) => (
  <Menu
    onClick={({ key }) => router.push(key)}
    selectedKeys={[router.pathname]}
    mode="inline"
    theme="dark"
  >
    {routes.map(({ key, icon, message }) => (
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
