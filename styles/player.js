import css from 'styled-jsx/css';
import { spacing } from './base';

// prettier-ignore
export default css`
  .root {
    padding-left: ${spacing.medium}px;
    padding-right: ${spacing.medium}px;
    padding-top: ${spacing.medium}px;
    padding-bottom: ${spacing.medium}px;

    .directions {
      display: inline-grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: ${spacing.medium}px;
    }

    .volume {
      display: grid;
      grid-template-columns: 14px 28px 1fr;
      grid-gap: ${spacing.medium}px;
      align-items: center;
    }

    .progress {
      display: grid;
      grid-template-columns: 14px 1fr;
      grid-gap: ${spacing.medium}px;
      align-items: center;
    }
  }
`;
