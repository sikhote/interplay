import css from 'styled-jsx/css';
import { spacing, bps, fontWeights } from '../../lib/styling';

export default css`
	.container {
		padding: ${spacing.a5}px ${spacing.pageHorizontal}px;
		background: linear-gradient(
			to top,
			transparent 50%,
			rgba(0, 0, 0, 0.1) 100%
		);
		border-top: 1px solid rgba(0, 0, 0, 0.15);
		display: grid;
		grid-template-columns: 0px 1fr;
		grid-area: player;
	}
	.video {
		grid-gap: ${spacing.a5}px;
		grid-template-columns: 120px 1fr;
	}
	.video.is-full-screen :global(.player) {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		width: 100% !important;
		height: 100% !important;
		text-align: center;
		max-width: 100%;
	}
	:global(.player) {
		overflow: hidden;
		cursor: pointer;
		background: black;
	}
	:global(.player video) {
		object-fit: contain;
		width: 100% !important;
		height: 100% !important;
	}
	.main {
		display: grid;
		grid-column-gap: ${spacing.a9}px;
		grid-row-gap: ${spacing.a5}px;
		grid-template-columns: 0.7fr 1fr 0.7fr;
		grid-template-rows: auto auto;
		grid-template-areas:
			'info directions sound'
			'info progress sound';
		align-items: center;
		justify-items: stretch;
	}
	.directions {
		display: grid;
		grid-auto-columns: auto;
		grid-auto-flow: column;
		align-items: center;
		grid-area: directions;
		grid-gap: ${spacing.a7}px;
		justify-self: center;
	}
	.buttons {
		display: grid;
		grid-auto-columns: auto;
		grid-auto-flow: column;
		grid-gap: ${spacing.a4}px;
		align-items: center;
	}
	.sound {
		display: grid;
		grid-gap: ${spacing.a5}px;
		grid-area: sound;
		grid-template-columns: auto 1fr;
		align-items: center;
	}
	.sound :global(.loop),
	.sound :global(.shuffle) {
		display: none;
	}
	.info {
		grid-area: info;
		width: 100%;
		display: grid;
		grid-template-rows: 1fr;
		grid-auto-flow: row;
	}
	.info :global(span) {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	:global(.name) {
		font-weight: ${fontWeights.bold} !important;
	}
	:global(.divider) {
		display: none;
	}
	:global(.progress) {
		grid-area: progress;
	}

	@media (max-width: ${bps.a2 - 1}px) {
		.container {
			padding: ${spacing.pageA2}px;
		}
		.main {
			grid-template-areas:
				'sound sound'
				'progress directions'
				'info info';
			grid-template-columns: 1fr auto;
			grid-template-rows: auto auto auto;
			grid-column-gap: ${spacing.a5}px;
			grid-row-gap: ${spacing.a5}px;
		}
		.directions {
			grid-gap: 0;
		}
		.directions :global(.loop),
		.directions :global(.shuffle) {
			display: none;
		}
		.buttons {
			grid-gap: ${spacing.a3}px;
		}
		.sound {
			display: grid;
			grid-gap: ${spacing.a5}px;
			grid-area: sound;
			grid-template-columns: auto 1fr;
			align-items: center;
		}
		.sound :global(.loop),
		.sound :global(.shuffle) {
			display: block;
		}
		.switches {
			display: grid;
			grid-gap: ${spacing.a3}px;
			grid-template-columns: auto auto auto;
		}
		.info {
			display: block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		:global(.name) {
			font-weight: ${fontWeights.normal} !important;
		}
		:global(.divider) {
			display: inline;
		}
	}
`;
