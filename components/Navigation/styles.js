import css from 'styled-jsx/css';
import { colors, spacing, bps } from '../../lib/styling';

export default css`
	@import url('/static/css/fontello.css');

	.container {
		background: ${colors.navigationBg};
		width: 280px;
		padding-top: ${spacing.pageVertical}px;
		display: grid;
		grid-auto-flow: row;
		grid-auto-rows: auto;
		align-items: start;
		align-content: start;
	}

	.item {
		text-decoration: none;
		padding: ${spacing.a4}px ${spacing.pageHorizontal}px;
	}

	:global(.item-title) {
		padding-left: ${spacing.a5}px;
	}

	@media (max-width: ${bps.a2}px) {
		.container {
			width: 100%;
			padding-top: 0;
			grid-auto-flow: column;
			grid-auto-rows: 1fr;
			grid-auto-columns: 1fr;
			align-items: stretch;
			align-content: stretch;
		}

		.item {
			padding: ${spacing.a4}px 0;
			text-align: center;
		}

		:global(.item-title),
		:global(.playlist),
		:global(.playlist-add) {
			display: none;
		}
	}
`;

// 	containerA3: {
// 		flexDirection: 'row',
// 		width: '100%',
// 		paddingVertical: 0,
// 	},

// 	itemA3: {
// 		flex: 1,
// 		justifyContent: 'center',
// 	},
