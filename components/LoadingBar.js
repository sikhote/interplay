import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import style from '../styles/loading-bar';

const startDelay = 1000;
let timer = null;

Router.onRouteChangeStart = () => {
  timer = setTimeout(() => NProgress.start(), startDelay);
};

Router.onRouteChangeComplete = () => {
  clearTimeout(timer);
  NProgress.done();
};

Router.onRouteChangeError = () => {
  clearTimeout(timer);
  NProgress.done();
};

const LoadingBar = () => (
  <style jsx global>
    {style}
  </style>
);

export default LoadingBar;
