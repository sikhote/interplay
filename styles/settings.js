import css from 'styled-jsx/css';
import { spacing } from './base';

// prettier-ignore
export default css`
  .root {
    padding-left: ${spacing.size3}px;
    padding-right: ${spacing.size3}px;
    padding-bottom: ${spacing.size3}px;

    :global(.alert) {
      width: 100%;
      max-width: 300px;
    }

    .inputs {
      padding-top: ${spacing.size4}px;
      display: grid;
      place-items: start;
      place-content: start;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      grid-auto-rows: auto;
      grid-auto-flow: row;
      grid-gap: ${spacing.size3}px;
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
      grid-gap: ${spacing.size3}px;
    }
  }
`;
