import css from 'styled-jsx/css';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Cookies from 'js-cookie';
import { Button, Input } from 'antd';
import { filesSync } from '../requests/files';
import { cloudSaveOther, cloudGet, cloudDelete } from '../requests/cloud';
import getInitialState from '../lib/get-initial-state';
import H1 from '../components/H1';
import InputIcon from '../components/InputIcon';
import Spacer from '../components/Spacer';
import Text from '../components/Text';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import { colors, spacing, bps } from '../lib/styling';

const styles = css`
  .container {
    padding: ${spacing.page}px;
  }
  .inputs {
    max-width: 400px;
  }
  :global(.save) {
    width: 100%;
  }
  .icons {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: auto;
    justify-content: start;
    grid-gap: ${spacing.a3}px;
  }
  .icons :global(.ant-btn) {
  }

  @media (max-width: ${bps.a2}px) {
    .container {
      padding: ${spacing.pageA2}px;
    }
  }
`;

const Settings = ({ store, dispatch }) => {
  const {
    cloud: { user, key, path, isConnected, date, status },
  } = store;

  return (
    <div className="container">
      <style jsx>{styles}</style>
      <H1>Settings</H1>
      <Spacer />
      <Text>
        This website allows a user to easily create playslists and stream music
        and videos from a Dropbox account. Enter a Dropbox API key and the path
        to the Dropbox folder your media is located in. Optionally, enter a user
        name. All settings and playlists are stored in folder within the
        specified Dropbox folder.
      </Text>
      <Spacer />
      <div className="inputs">
        <Input
          prefix={<InputIcon icon="user" />}
          placeholder="person"
          value={user}
          onChange={e => {
            Cookies.set('user', e.target.value);
            dispatch({
              type: 'cloud-update',
              payload: ['user', e.target.value],
            });
          }}
        />
        <Spacer height={spacing.a2} />
        <Input
          prefix={<InputIcon icon="key" />}
          placeholder="abc123"
          value={key}
          onChange={e => {
            Cookies.set('key', e.target.value);
            dispatch({
              type: 'cloud-update',
              payload: ['key', e.target.value],
            });
          }}
        />
        <Spacer height={spacing.a2} />
        <Input
          className="input"
          prefix={<InputIcon icon="folder" />}
          placeholder="itunes/itunes music"
          value={path}
          onChange={e => {
            Cookies.set('path', e.target.value.toLowerCase());
            dispatch({
              type: 'cloud-update',
              payload: ['path', e.target.value],
            });
          }}
        />
        <Spacer height={spacing.a2} />
        <Button
          className="save"
          type="primary"
          onClick={() => cloudGet({ dispatch, store })}
        >
          Save
        </Button>
      </div>
      <Spacer />
      <Text>
        {isConnected ? 'Settings connected. ' : 'Settings not connected. '}
        {status === 'success'
          ? `Files synced ${moment(date).fromNow()}.`
          : 'Files never synced.'}
      </Text>
      <Spacer />
      <div className="icons">
        {status === 'syncing' && (
          <IconButton
            onClick={() =>
              dispatch({
                type: 'cloud-update',
                payload: ['status', 'cancelled'],
              })
            }
          >
            <Icon icon="cancel" />
          </IconButton>
        )}
        <IconButton
          loading={status === 'syncing'}
          onClick={() => filesSync({ dispatch, store })}
        >
          <Icon color={colors.white} icon="arrows-ccw" />
        </IconButton>
        <IconButton onClick={() => cloudSaveOther({ store })}>
          <Icon icon="upload-cloud" />
        </IconButton>
        <IconButton onClick={() => cloudGet({ dispatch, store })}>
          <Icon icon="download-cloud" />
        </IconButton>
        <IconButton
          onClick={() => {
            Cookies.set('key', '');
            Cookies.set('path', '');
            Cookies.set('user', '');
            dispatch({
              type: 'cloud-update-many',
              payload: getInitialState().cloud,
            });
            cloudDelete({ store });
          }}
        >
          <Icon icon="trash" />
        </IconButton>
      </div>
    </div>
  );
};

Settings.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Settings;
