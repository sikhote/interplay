import css from 'styled-jsx/css';

// prettier-ignore
export default css`
  .root {
    .draggable {
      &.is-dragging {
        top: 0 !important;
        left: 0 !important;
        position: relative !important;
        ${'' /* transform: none !important; */}
      }
    }

    :global(.ReactVirtualized__Table__row) {
      display: grid;
      outline: none;
    }
  }
`;
