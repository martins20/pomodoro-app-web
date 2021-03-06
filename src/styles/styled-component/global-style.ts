import { createGlobalStyle } from "styled-components"
import { scrollbarCSS } from "./scrollbar"

export const GlobalStyle = createGlobalStyle`
    :root {
        --color-white: #eaebf0;
        --color-purple: #b968f1;
        --color-green: #4dc70c;
        --color-red: #FF4747;

        --color-gray-400: #272833;
        --color-gray-500: #20212C;
        --color-gray-800: #1d1e26;
        --color-gray-900: #1a1b24;

        --color-purple-500: #B968F1;
        --color-purple-600: #9444CB;
    }
    
    * {
        margin: 0;
        padding: 0;
        outline: none;

        box-sizing: border-box;

        color: var(--color-white);
        font-family: "Roboto", Helvetica, sans-serif;

        ${scrollbarCSS}
    }

    button {
        cursor: pointer;
    }

    #root, html, body {
        display: flex;

        flex-direction: column;

        width: 100vw;
        height: 100vh;

        background: var(--color-gray-800);
    }
`
