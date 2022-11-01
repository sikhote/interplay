import Head from 'next/head';
import l from 'lib/language';

const PageTitle = ({ title }) => (
  <Head>
    <title>
      {l.global.name}
      {title ? `${l.global.divider}${title}` : ''}
    </title>
  </Head>
);

export default PageTitle;
