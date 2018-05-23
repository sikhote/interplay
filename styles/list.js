import css from 'styled-jsx/css';
import { spacing } from './base';

// prettier-ignore
export default css`
  .root {
    display: grid;
    grid-template-rows: auto 1fr;

    h1 {
      padding-top: ${spacing.small}px;
      padding-left: ${spacing.medium}px;
      padding-right: ${spacing.medium}px;
    }
  }
`;
