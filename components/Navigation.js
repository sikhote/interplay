import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import WindowSizeListener from 'react-window-size-listener';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: typeof window !== 'undefined' ? window.innerWidth : 800,
    };
  }
  render() {
    const { router } = this.props;
    const { width } = this.state;

    return (
      <div className="root" style={{ height: '100%' }}>
        <style jsx>
          {`
            .root {
              @media (max-width: 799px) {
                :global(.ant-menu) {
                  display: flex;
                  align-items: center;
                }

                :global(.ant-menu-item) {
                  float: none;
                  text-align: center;
                  flex: 1 1 auto;
                  line-height: 1em;
                  padding: 10px;
                }

                :global(.anticon) {
                  display: block;
                  margin-right: 0;
                  margin-bottom: 5px;
                }
              }
            }
          `}
        </style>
        <WindowSizeListener
          onResize={({ windowWidth: width }) => this.setState({ width })}
        />
        <Menu
          style={{ height: '100%' }}
          onClick={({ key }) => router.push(key)}
          selectedKeys={[router.pathname]}
          mode={width < 800 ? 'horizontal' : 'inline'}
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
      </div>
    );
  }
}

Navigation.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(Navigation);
