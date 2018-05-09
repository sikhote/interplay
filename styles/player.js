import css from 'styled-jsx/css';
import { spacing, bps } from './base';

// prettier-ignore
export default css`
  .root {
    padding-left: ${spacing.medium}px;
    padding-right: ${spacing.medium}px;
    padding-top: ${spacing.medium}px;
    padding-bottom: ${spacing.medium}px;
    background:
      linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.02) 100%);

    .easy-grid {
      display: grid;
      grid-template-columns: auto;
      grid-auto-columns: auto;
      grid-auto-flow: column;
      grid-gap: ${spacing.large}px;
      align-items: center;
    }

    .main {
      display: grid;
      grid-column-gap: ${spacing.large}px;
      grid-row-gap: ${spacing.medium}px;
      grid-template-rows: auto;

      .directions {
        grid-area: directions;
        grid-gap: ${spacing.medium}px;
      }

      .control {
        grid-template-columns: auto auto 1fr;
        grid-gap: ${spacing.medium}px;
        max-width: 400px;

        &.sound {
          grid-area: sound;
        }

        &.progress {
          grid-area: progress;
        }
      }

      .info {
        grid-area: info;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    @media (max-width: ${bps.medium - 1}px) {
      .main {
        display: grid;
        grid-column-gap: ${spacing.large}px;
        grid-row-gap: ${spacing.medium}px;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto;
        grid-template-areas:
          "directions sound"
          "progress progress"
          "info info";

        .control {
          &.sound {
            max-width: 295px;
          }
        }
      }
    }

    @media (min-width: ${bps.medium}px) {
      .main {
        grid-template-columns: auto 200px 1fr;
        grid-template-areas:
          "directions sound progress"
          "info info info";
      }
    }
  }
`;
