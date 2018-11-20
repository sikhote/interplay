import css from 'styled-jsx/css';
import { colors, bps } from '../../lib/styling';

export default css`
	.container {
		background: ${colors.background};
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: 1fr auto;
		grid-template-areas:
			'navigation main'
			'player player';
		height: 100vh;
	}

	@media (max-width: ${bps.a2}px) {
		.container {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto 1fr;
			grid-template-areas:
				'navigation'
				'player'
				'main';
		}
	}
`;
