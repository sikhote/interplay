import css from 'styled-jsx/css';
import { transparentize } from 'polished';
import { colors, spacing, fontSizes } from './base';

// prettier-ignore
export default css`
  .root {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;

    .search {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.02) 0%,
        rgba(0, 0, 0, 0.03) 100%
      );
      padding-left: ${spacing.medium}px;
      padding-right: ${spacing.medium}px;
      padding-bottom: ${spacing.medium}px;

      :global(.ant-input-group-wrapper) {
        max-width: 200px;
      }

      :global(.ant-input) {
        box-shadow: none;
        border-color: rgba(0, 0, 0, 0.1);
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
      padding-left: ${spacing.medium}px;
      padding-right: ${spacing.medium}px;
      align-items: center;
    }

    :global(.ReactVirtualized__Table__headerColumn) {
      outline: none;
      font-weight: bold;
      ${fontSizes.smallTitle}
      display: flex;
      align-items: center;
    }

    :global(.ReactVirtualized__Table__headerColumn svg) {
      padding-left: ${spacing.small}px;
      width: 24px;
      height: 24px;
    }

    :global(.ReactVirtualized__Table__headerRow),
    :global(.ReactVirtualized__Table__row) {
      display: grid;
      align-items: center;

    }

    :global(.ReactVirtualized__Table__headerRow) {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.03) 100%
      );
    }

    :global(.ReactVirtualized__Table__row) {
      outline: none;
    }

    :global(.ReactVirtualized__Table__row:nth-child(even)) {
      background: rgba(0, 0, 0, 0.03);
    }

    :global(.ReactVirtualized__Table__row.active) {
      background: ${transparentize(0.8, colors.blue)};
    }
  }
`;
