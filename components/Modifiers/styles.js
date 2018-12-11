import css from 'styled-jsx/css';
import { spacing, bps, colors, zIndexes, speeds } from '../../lib/styling';

export default css`
  .container {
    z-index: ${zIndexes.modifiers};
    position: absolute;
    top: 0;
    right: 0;
    padding: ${spacing.pageVertical}px ${spacing.pageHorizontal}px;
    background: ${colors.modifiersBg};
    height: 100%;
    border-top: 1px solid ${colors.border};
    border-left: 1px solid ${colors.border};
    transition: all ease ${speeds.a1}s;
    transform: translateX(100%);
    width: 300px;
    display: grid;
    grid-template-rows: auto;
    grid-gap: ${spacing.a6}px;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    align-content: start;
  }
  .container.show {
    transform: translateX(0);
  }
  .playlists {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: ${spacing.a4}px;
  }
  .name {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: ${spacing.a4}px;
  }
  .moving {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${spacing.a4}px;
  }

  @media (max-width: ${bps.a2}px) {
  }
`;
