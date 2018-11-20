import css from 'styled-jsx/css';
import { lighten, transparentize } from 'polished';
import {
	spacing,
	bps,
	colors,
	fontWeights,
	fontSizes,
} from '../../lib/styling';

export default css`
	.container {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr;
	}
	.header {
		padding-top: ${spacing.pageVertical}px;
		padding-left: ${spacing.pageHorizontal}px;
		padding-bottom: ${spacing.a3}px;
		padding-right: ${spacing.a4}px;
		display: grid;
		grid-template-columns: 1fr auto;
	}
	.controls {
		display: grid;
		grid-auto-columns: auto;
		grid-auto-flow: column;
		grid-gap: ${spacing.a3}px;
		position: relative;
		bottom: ${spacing.a3}px;
		max-width: 275px;
	}
	:global(.ReactVirtualized__Grid) {
		outline: none;
	}
	:global(.ReactVirtualized__Table__row),
	:global(.ReactVirtualized__Table__headerRow) {
		display: grid;
		grid-gap: ${spacing.a5}px;
		grid-template-columns: 40px 1fr 1fr 1fr;
		padding: 0 ${spacing.a5}px;
		align-items: center;
		outline: none;
		cursor: pointer;
	}
	:global(.table.playlists .ReactVirtualized__Table__row),
	:global(.table.playlists .ReactVirtualized__Table__headerRow) {
		grid-template-columns: 1fr 90px 90px 60px;
	}
	:global(.table.video .ReactVirtualized__Table__row),
	:global(.table.video .ReactVirtualized__Table__headerRow) {
		grid-template-columns: 1fr 1fr;
	}
	:global(.ReactVirtualized__Table__row:nth-child(even)) {
		background: rgba(0, 0, 0, 0.03);
	}
	:global(.ReactVirtualized__Table__row.active) {
		background: ${transparentize(0.8, colors.a1)};
	}
	:global(.ReactVirtualized__Table__headerRow) {
		border-top: 1px solid ${lighten(0.07, colors.border)};
		border-bottom: 1px solid ${colors.border};
		background: linear-gradient(
			to bottom,
			transparent 0%,
			rgba(0, 0, 0, 0.08) 100%
		);
	}
	:global(.ReactVirtualized__Table__headerColumn),
	:global(.ReactVirtualized__Table__rowColumn) {
		text-overflow: ellipsis;
		white-space: nowrap;
		outline: none;
	}
	:global(.ReactVirtualized__Table__headerColumn) {
		font-weight: ${fontWeights.bold};
		font-size: ${fontSizes.a2}px;
		display: grid;
		grid-template-columns: auto auto;
		justify-content: start;
		align-items: center;
	}
	:global(.ReactVirtualized__Table__headerColumn:not([aria-sort])) {
		color: rgba(0, 0, 0, 0.45);
	}
	:global(.ReactVirtualized__Table__headerColumn svg) {
		padding-left: ${spacing.a2}px;
		width: 24px;
		height: 24px;
	}
	:global(.no-data) {
		padding: ${spacing.a4}px ${spacing.a5}px;
	}

	@media (max-width: ${bps.a2}px) {
		.header {
			padding: ${spacing.pageA2}px;
			padding-bottom: ${spacing.a3}px;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;
			grid-gap: ${spacing.a4}px;
		}
	}
`;
