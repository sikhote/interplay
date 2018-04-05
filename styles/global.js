import css from 'styled-jsx/css';
import { fontSizes, fontFamilies, colors } from './base';

// prettier-ignore
export default css`
  body {
    margin: 0;
    ${fontSizes.small}
    ${fontFamilies.sansSerif}
    color: ${colors.text};
    font-weight: 200;

    * {
      margin: 0;
      padding: 0;
    }
  }
`;
