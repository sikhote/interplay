import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { colors } from '../lib/styles';

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
    {`
      #nprogress {
        pointer-events: none;

        .bar {
          background: ${colors.blue};
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
        }

        .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          opacity: 1;
          transform: rotate(3deg) translate(0px, -4px);
        }
      }
    `}
  </style>
);

export default LoadingBar;
