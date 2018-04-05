import css from 'styled-jsx/css';
import { bps } from './base';

// prettier-ignore
export default css`
  .root {
    display: grid;
    height: 100vh;

    @media (max-width: ${bps.medium - 1}px) {
      grid-template-areas: 'children' 'navigation';
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 55px;
    }

    @media (min-width: ${bps.medium}px) {
      grid-template-areas: 'navigation children';
      grid-template-columns: 200px 1fr;
      grid-template-rows: 1fr;
    }
  }
`;
