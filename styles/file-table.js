import css from 'styled-jsx/css';
import { transparentize } from 'polished';
import { colors } from './base';

// prettier-ignore
export default css`
  .root {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;

    .search {
      :global(.ant-input) {
        border-radius: 0;
        border-left: 0;
        border-right: 0;
      }
    }

    :global(.ReactVirtualized__Table__headerRow) {
      display: grid;
    }

    :global(.ReactVirtualized__Table__headerColumn),
    :global(.ReactVirtualized__Table__rowColumn) {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :global(.ReactVirtualized__Table__row) {
      display: grid;
    }

    :global(.ReactVirtualized__Table__row) {
      display: grid;
      outline: none;
    }

    :global(.ReactVirtualized__Table__row:nth-child(odd)) {
      background: rgba(0, 0, 0, 0.03);
    }

    :global(.ReactVirtualized__Table__row.active) {
      background: ${transparentize(0.8, colors.blue)};
    }
  }
`;
