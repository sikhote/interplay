import css from 'styled-jsx/css';
import { colors, spacing, bps } from '../../lib/styling';

export default css`
  .container {
    width: 240px;
    background: ${colors.a2};
    display: grid;
    grid-auto-flow: row;
    align-content: start;
    padding-top: ${spacing.a5}px;
    grid-area: navigation;
  }
  .item {
    color: ${colors.navigationItem};
    padding: ${spacing.a4}px ${spacing.pageHorizontal}px;
    text-decoration: none;
  }
  .item.active :global(.title),
  .item.active :global(.icon) {
    color: ${colors.navigationItemActive} !important;
  }
  .item :global(.title) {
    padding-left: ${spacing.a5}px;
  }
  .item.playlists {
    display: none;
  }

  @media (max-width: ${bps.a2}px) {
    .container {
      width: 100%;
      grid-auto-flow: column;
      align-content: stretch;
      padding-top: 0;
    }
    .item {
      text-align: center;
      padding: ${spacing.a4}px 0;
    }
    .item.playlists {
      display: block;
    }
    .item.playlist,
    .item.playlist-add,
    .item :global(.title) {
      display: none;
    }
  }
`;
