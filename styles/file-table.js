import css from 'styled-jsx/css';

// prettier-ignore
export default css`
  .root {
    width: 100%;
    height: 100%;

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
  }
`;
