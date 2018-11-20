import css from 'styled-jsx/css';
import { spacing, bps } from './base';

// prettier-ignore
export default css`
  .root {
    padding-left: ${spacing.size3}px;
    padding-right: ${spacing.size3}px;
    padding-top: ${spacing.size3}px;
    padding-bottom: ${spacing.size3}px;
		background: linear-gradient(
			to top,
			transparent 66%,
			rgba(0, 0, 0, .1) 100%
		);
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    display: grid;
    grid-template-columns: 0px 1fr;
		grid-area: player;
	}

  .video {
    grid-gap: ${spacing.size4}px;
    grid-template-columns: 120px 1fr;
	}

  .video.is-full-screen :global(.player) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100% !important;
    height: 100% !important;
    text-align: center;
    max-width: 100%;
  }

  :global(.player) {
    overflow: hidden;
    cursor: pointer;
    background: black;
  }

  :global(.player video) {
    object-fit: contain;
    width: 100% !important;
    height: 100% !important;
  }

  .main {
      display: grid;
      grid-column-gap: ${spacing.size4}px;
      grid-row-gap: ${spacing.size3}px;
      grid-template-rows: auto;
	}

  .directions {
    display: grid;
    grid-template-columns: auto;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    align-items: center;
    grid-area: directions;
    grid-gap: ${spacing.size2}px;
  }

  .control {
    display: grid;
    align-items: center;
    grid-gap: ${spacing.size2}px;
    max-width: 400px;
	}

  .sound {
    grid-area: sound;
    grid-template-columns: auto 1fr;
  }

  .progress {
    grid-area: progress;
    grid-template-columns: auto auto 1fr;
  }

  .info {
    grid-area: info;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media (max-width: ${bps.medium - 1}px) {
    .main {
      display: grid;
      grid-column-gap: ${spacing.size4}px;
      grid-row-gap: ${spacing.size3}px;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto;
      grid-template-areas:
        "directions sound"
        "progress progress"
        "info info";
		}

    .sound {
      max-width: 253px;
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
`;
