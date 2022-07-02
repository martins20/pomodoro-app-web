import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    :root {
        --color-background:  #1d1e26;
        --color-white: #eaebf0;
        --color-purple: #b968f1;
        --color-green: #83ea4c;
        --color-red: #F25757
    }
    
    * {
        margin: 0;
        padding: 0;
        outline: none;

        box-sizing: border-box;

        color: var(--color-white);
        font-family: "Roboto", Helvetica, sans-serif;
    }

    button {
        cursor: pointer;
    }

    #root, html, body {
        display: flex;

        flex-direction: column;

        width: 100vw;
        height: 100vh;

        background: var(--color-background);
    }
`
