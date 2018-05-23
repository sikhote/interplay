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
    }

    @media (max-width: ${bps.medium - 1}px) {
      grid-template-areas:
        "navigation"
        "main";
      grid-template-columns: 1fr;
      grid-template-rows: 30px 1fr;

      .main {
        grid-template-rows: auto 1fr;
      }
    }

    @media (min-width: ${bps.medium}px) {
      grid-template-areas: "navigation main";
      grid-template-columns: 200px 1fr;
      grid-template-rows: 1fr;

      .main {
        grid-template-rows: auto 1fr;
      }
    }
  }
`;
