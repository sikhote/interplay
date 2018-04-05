import css from 'styled-jsx/css';
import { colors } from './base';

// prettier-ignore
export default css`
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
`;
