import { css } from "styled-components"

export const scrollbarCSS = css`
  ::-webkit-scrollbar {
    width: 0.35rem;
    height: 0.35rem;
  }

  ::-webkit-scrollbar-button {
    width: 1rem;
    height: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-white);

    border-radius: 50px;

    :hover {
      filter: brightness(2);
    }

    :active {
      filter: brightness(2);
    }
  }

  ::-webkit-scrollbar-track {
    background: rgb(0, 0, 0, 0.1);
    border: 0px none red;
    border-radius: 18px;

    padding-left: 10px;

    :hover {
      background: rgb(0, 0, 0, 0.3);
    }

    :active {
      background: rgb(0, 0, 0, 0.3);
    }
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }
`
