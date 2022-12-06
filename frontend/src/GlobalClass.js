import { css } from "styled-components";
export const GlobalClass = css`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    :root{
        --primary-color: rgb(30, 178, 166);
        --primary-text-color: rgba(255, 255, 255, 0.9);
        --text-size: 16px;
        --heading-section-size: 46px;
    }
    body{
        font-family: 'Roboto', sans-serif;
        overflow-x: hidden;
    }
    .showSideBar{
        transform: translateX(0);
    }
`