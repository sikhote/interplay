import css from 'styled-jsx/css';
import {
  colors,
  bps,
  fontSizes,
  lineHeights,
  spacing,
  borderRadii,
} from './base';

// prettier-ignore
export default css`
  .root {
    height: 100%;
    background: ${colors.menu};

    .item {
      color: ${colors.menuItemColor};
      ${fontSizes.menuItemTitle}
      ${lineHeights.normal}
      padding-top: ${spacing.size3}px;
      padding-bottom: ${spacing.size3}px;
      padding-left: ${spacing.size3}px;
      padding-right: ${spacing.size3}px;
      position: relative;

      .inner {
        padding-top: ${spacing.size3}px;
        padding-bottom: ${spacing.size3}px;
        padding-left: ${spacing.size3}px;
        padding-right: ${spacing.size3}px;

        i {
          margin-right: ${spacing.size3}px;
        }
      }

      &.active {
        background: ${colors.menuItemBackgorund};
        color: ${colors.menuItemActiveColor};
      }

      &.is-droppable {
        .inner {
          outline: 1px solid ${colors.menuItemDropBorder};
          ${borderRadii.size1}
        }
      }

      &.is-dropping {
        .inner {
          background: ${colors.menuItemDroppingBackground};
        }
      }
    }

    @media (max-width: ${bps.medium - 1}px) {
      .item {
        &.playlist {
          display: none;
        }
      }
    }

    @media (min-width: ${bps.medium}px) {
      .item {
        &.playlists {
          display: none;
        }
      }
    }
  }
`;
