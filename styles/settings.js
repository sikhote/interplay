import css from 'styled-jsx/css';
import { spacing } from './base';

// prettier-ignore
export default css`
  .root {
    display: grid;
    place-items: start;
    place-content: start;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    grid-gap: ${spacing.medium}px;
    padding-left: ${spacing.medium}px;
    padding-right: ${spacing.medium}px;
    padding-bottom: ${spacing.medium}px;
    padding-top: ${spacing.medium}px;

    :global(.alert) {
      width: auto;
    }

    :global(.input) {
      max-width: 300px;
    }

    .actions {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 1fr;
      grid-auto-flow: column;
      grid-auto-rows: auto;
      grid-gap: ${spacing.medium}px;
    }
  }
`;
