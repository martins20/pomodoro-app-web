import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;

        box-sizing: border-box;

        color: white;
    }

    #root, html, body {
        display: flex;

        flex-direction: column;

        width: 100vw;
        height: 100vh;

        background: #1d1e26;
    }
`
