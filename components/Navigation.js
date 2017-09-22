import React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

const Item = ({ key, message, icon, ...props }) => (
  <Menu.Item key={key} {...props}>
    <Icon type={icon} />
    <FormattedMessage {...message}>{message => <span>{message}</span>}</FormattedMessage>
  </Menu.Item>
);

const Navigation = ({ viewer, path }, { router }) => (
  <Box>
    <Menu
      onClick={({ key }) => router.replace(key)}
      selectedKeys={[path]}
      mode="inline"
      style={{ height: '100vh', width: 200 }}
      theme="dark"
    >
      <Item key="/" message="Player" icon="caret-right" />
      <Item key="/audio" message="Audio" icon="bars" />
      <Item key="/video" message="Video" icon="bars" />
      <Item key="/settings" message={linksMessages.settings} icon="setting" />
      <Item key="/signin" message={linksMessages.signIn} icon="user" />
    </Menu>
  </Box>
);

Header.contextTypes = { router: React.PropTypes.object };

export default compose(connect((state: State) => ({ viewer: state.users.viewer })))(Header);
