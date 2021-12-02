import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Button from 'components/Button';
import InputText from 'components/InputText';
import InputSelect from 'components/InputSelect';
// import { cloudGet } from 'lib/actions/cloud';
import styles from './styles';
import l from 'lib/language';
import { startAuth, attemptConnect } from 'lib/features/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const SettingsFields = ({ rootCss }) => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const { user, folder } = useSelector((state) => state.prefs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startAuth());
  }, []);

  return (
    <div css={[styles.root, ...rootCss]}>
      <InputText
        rootCss={[styles.element]}
        disabled={auth.status.type === 'connected'}
        icon="user"
        placeholder={l.settingsFields.user}
        value={user}
        onChange={(e) => {
          Cookies.set('user', e.target.value);
          dispatch({
            type: 'cloud-update',
            payload: ['user', e.target.value],
          });
        }}
      />
      <InputText
        rootCss={[styles.element]}
        disabled={auth.status.type === 'connected'}
        icon="folder"
        placeholder="itunes/itunes music"
        value={folder}
        onChange={(e) => {
          Cookies.set('path', e.target.value.toLowerCase());
          dispatch({
            type: 'cloud-update',
            payload: ['path', e.target.value.toLowerCase()],
          });
        }}
      />
      <Button
        rootCss={[styles.element]}
        icon="login"
        isLoading={auth.status.type === 'connecting'}
        onClick={() => dispatch(attemptConnect())}
      >
        {l.settingsFields.dropbox}
      </Button>
      {auth.status.type === 'error' && <div>{auth.status.error}</div>}
      {/* {status === 'connected' && (
        <Button
          style={styles.marginTop}
          icon="logout"
          onPress={() => {
            dispatch({ type: 'reset' });
            Router.push('/welcome');
          }}
        >
          Log Out
        </Button>
      )} */}
      {/* {status !== 'connected' && (
        <Button
          style={styles.marginTop}
          icon="login"
          isLoading={status === 'connecting'}
          onPress={() => {
            dispatch({
              type: 'cloud-update',
              payload: ['status', 'connecting'],
            });

            cloudGet(store)
              .then((storeUpdates) => {
                Router.push('/').then(() => {
                  dispatch({ type: 'store-update', payload: storeUpdates });
                  dispatch({
                    type: 'notifications-add',
                    payload: {
                      type: 'success',
                      message: 'Successfully downloaded from cloud',
                      id: uuidv4(),
                    },
                  });
                });
              })
              .catch(() => {
                dispatch({
                  type: 'cloud-update',
                  payload: ['status', 'disconnected'],
                });
                dispatch({
                  type: 'notifications-add',
                  payload: {
                    type: 'error',
                    message: 'Failed to download from cloud',
                    id: uuidv4(),
                  },
                });
              });
          }}
        >
          Log In
        </Button>
      )} */}
    </div>
  );
};

SettingsFields.propTypes = {
  rootCss: PropTypes.array,
};

SettingsFields.defaultProps = {
  rootCss: [],
};

export default SettingsFields;
