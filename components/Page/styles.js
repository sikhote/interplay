import css from 'styled-jsx/css';
import { colors, spacing, bps } from '../../lib/styling';

export const globalStyles = css`
  @import url('/static/css/fontello.css');

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
`;

export const localStyles = css`
	.container {
		background: ${colors.background};
		display: grid;
		grid-template-columns: auto 1fr;
    ${'' /* display: flex;
    flex-direction: column; */}
    height: 100vh;
	}

	@media (max-width: ${bps.a2}px) {
		.container {
			grid-template-columns: 1fr;
			grid-template-rows: auto 1fr;
      ${'' /* flex-direction: row; */}
		}

    ${'' /* .container *:first-child {
      fl
    } */}

    ${'' /* .main {
      ${'' /* overflow-y: scroll; */}
      flex: 1 1 auto;
    } */}
	}
`;

// export default {
// 	container: {
// 		height: '100vh',
// 		backgroundColor: colors.background,
// 		flexDirection: 'row',
// 	},
// 	containerA3: {
// 		flexDirection: 'column',
// 	},
// 	main: {
// 		flex: 1,
// 	},
// 	mainHorizontalPadding: {
// 		paddingHorizontal: spacing.pageHorizontal,
// 	},
// 	mainHorizontalPaddingA3: {
// 		paddingHorizontal: spacing.pageHorizontalA3,
// 	},
// 	mainVerticalPadding: {
// 		paddingVertical: spacing.pageVertical,
// 	},
// 	mainVerticalPaddingA3: {
// 		paddingVertical: spacing.pageVerticalA3,
// 	},
// };
