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
  }
  .container.show {
    transform: translateX(0);
  }
  .container > *:nth-child(n + 2) {
    margin-top: ${spacing.a5}px;
  }
  .playlists {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: ${spacing.a4}px;
  }

  @media (max-width: ${bps.a2}px) {
  }
`;
