import css from 'styled-jsx/css';
import { colors, bps } from './base';

// prettier-ignore
export default css`
  .root {
    height: 100%;

    :global(.ant-menu) {
      height: 100%;
    }

    @media (max-width: ${bps.medium - 1}px) {
      :global(.ant-menu) {
        display: flex;
        align-items: center;
        border: 0;
        line-height: 1em;
      }

      :global(.ant-menu-item) {
        top: auto;
        float: none;
        text-align: center;
        flex: 1 1 auto;
        line-height: 1em;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin: 0 !important;
        box-shadow: inset 0 1px 0 0 ${colors.darkBlue};
      }

      :global(.anticon) {
        display: block;
        margin-right: 0;
        margin-bottom: 10px;
      }
    }

    @media (min-width: ${bps.medium}px) {
      :global(.ant-menu-item) {
        margin-top: 0;
      }
    }
  }
`;
