import css from 'styled-jsx/css';
import { colors, spacing, bps } from '../../lib/styling';

export default css`
  .container {
    width: 240px;
    background: ${colors.a2};
    overflow-y: auto;
    height: 100%;
    grid-area: navigation;
  }
  .container-inner {
    padding: ${spacing.a5}px 0;
    display: grid;
    grid-auto-flow: row;
    align-content: start;
  }
  .item {
    color: ${colors.navigationItem};
    padding: ${spacing.a4}px ${spacing.page}px;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
  }
  .item.active :global(.title),
  .item.active :global(.icon) {
    color: ${colors.navigationItemActive} !important;
  }
  .item :global(.title) {
    padding-left: ${spacing.a5}px;
  }

  @media (max-width: ${bps.a2}px) {
    .container {
      width: 100%;
    }
    .container-inner {
      grid-auto-flow: column;
      align-content: stretch;
      padding-top: 0;
    }
    .item {
      text-align: center;
      padding: ${spacing.a4}px 0;
    }
    .item.playlist,
    .item.playlist-add,
    .item :global(.title) {
      display: none;
    }
  }
`;
