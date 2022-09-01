import React, { useEffect, useCallback } from 'react';
import Icon from 'components/Icon';
import styles from './styles';
import l from 'lib/language';
import * as authActions from 'lib/features/auth';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  TextInput,
  Text,
  Title,
  Modal,
  Space,
  Select,
  Loader,
} from '@mantine/core';

const Auth = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.startAuth());
  }, [dispatch]);

  return (
    <Modal
      centered
      hideCloseButton
      opened={auth.status !== 'authed'}
      styles={{ modal: styles.modal }}
      padding="xl"
      size={540}
    >
      <Title>{l.auth.header}</Title>
      <Text size="xl">{l.auth.body}</Text>
      <Space h="xl" />
      {['starting'].includes(auth.status) && <Loader />}
      {['disconnected', 'connecting'].includes(auth.status) && (
        <>
          <Text color="gray">{l.auth.step1}</Text>
          <Space h="sm" />
          <Button
            leftIcon={<Icon icon="login" />}
            loading={auth.status === 'connecting'}
            onClick={() => dispatch(authActions.attemptConnect('dropbox'))}
            disabled={!['disconnected', 'connecting'].includes(auth.status)}
          >
            {l.auth.dropbox}
          </Button>
        </>
      )}
      {['connected', 'authing'].includes(auth.status) && (
        <>
          <Text color="gray">
            {auth.members?.length > 0 ? l.auth.step2Alt : l.auth.step2}
          </Text>
          {auth.members?.length > 0 && (
            <>
              <Space h="sm" />
              <Select
                disabled={auth.status !== 'connected'}
                icon={<Icon icon="member" />}
                placeholder={l.auth.member}
                value={auth.memberId}
                data={auth.members.map((member, index) => ({
                  value: index,
                  label: member?.profile?.name?.display_name,
                }))}
                onChange={(value) => dispatch(authActions.memberId(value))}
              />
            </>
          )}
          <Space h="sm" />
          <TextInput
            disabled={auth.status !== 'connected'}
            icon={<Icon icon="user" />}
            placeholder={l.auth.user}
            value={auth.user}
            onChange={(e) => dispatch(authActions.user(e.target.value))}
          />
          <Space h="sm" />
          <TextInput
            disabled={auth.status !== 'connected'}
            icon={<Icon icon="folder" />}
            placeholder={l.auth.folder}
            value={auth.folder}
            onChange={(e) => dispatch(authActions.folder(e.target.value))}
          />
          <Space h="sm" />
          <Button
            leftIcon={<Icon icon="login" />}
            loading={auth.status === 'authing'}
            onClick={() => dispatch(authActions.checkFolder())}
          >
            {l.auth.connect}
          </Button>
        </>
      )}
    </Modal>
  );
};

export default Auth;
