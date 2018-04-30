import css from 'styled-jsx/css';
import { bps } from './base';

// prettier-ignore
export default css`
  .root {
    display: grid;
    height: 100vh;

    .navigation {
      grid-area: navigation;
    }

    .main {
      grid-area: main;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 80px 1fr;
    }

    @media (max-width: ${bps.medium - 1}px) {
      grid-template-areas: "main navigation";
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 55px;
    }

    @media (min-width: ${bps.medium}px) {
      grid-template-areas: "navigation main";
      grid-template-columns: 200px 1fr;
      grid-template-rows: 1fr;
    }
  }
`;
