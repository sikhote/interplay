import React from 'react';
import SettingsFields from 'components/SettingsFields';
import H1 from 'components/H1';
import PageTitle from 'components/PageTitle';
import styles from './styles';
import l from 'lib/language';

const Welcome = () => (
  <div css={styles.root}>
    <PageTitle title={l.welcome.title} />
    <H1>{l.welcome.header}</H1>
    {l.welcome.body}
    <SettingsFields rootCss={[styles.settingsFields]} />
  </div>
);

export default Welcome;
