import css from 'styled-jsx/css';
import { transparentize } from 'polished';
import { colors, spacing } from './base';

// prettier-ignore
export default css`
  .root {
    overflow: visible !important;

    .draggable {
      height: 100%;

      &.is-dragging {
        top: 0 !important;
        left: 0 !important;
        position: relative !important;
      }
    }

    :global(.ReactVirtualized__Table__row.even) {
      background: rgba(0, 0, 0, 0.03);
    }

    :global(.ReactVirtualized__Table__row.active) {
      background: ${transparentize(0.8, colors.blue)};
    }

    :global(.ReactVirtualized__Table__rowColumn) {
      white-space: nowrap;
      overflow: visible !important;
      text-overflow: ellipsis;
      padding-left: ${spacing.size3}px;
      padding-right: ${spacing.size3}px;
      align-items: center;
      display: grid;
    }
  }
`;
