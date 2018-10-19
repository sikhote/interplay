import Router from 'next/router';
import qp from 'query-parse';
import { matches, getCurrentPath, pages } from '../lib/routing';

export default () => {
  const currentPath = getCurrentPath();
  const match = matches.find(m => m(currentPath));
  const { page = '', alpha = '', ...params } = match ? match(currentPath) : {};
  const query = qp.toString(params);
  const syncedPath = `/${page ? `${page}` : ''}${alpha ? `/${alpha}` : ''}`;
  const pathWithQuery = `${syncedPath}${query ? `?${query}` : ''}`;

  // If match is found and page is valid and router is not up to speed,
  // then call replace with pathWithQuery to router and use currentPath as URL
  if (match && pages.includes(page) && Router.pathname !== currentPath) {
    Router.replace(pathWithQuery, `${currentPath}${window.location.search}`);
  }
};
