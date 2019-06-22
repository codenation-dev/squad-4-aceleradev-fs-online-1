import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body{
    height: 100%;
    background: #FF8700 !important;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-family: sans-serif;
  }
  .bg-dark-blue{
    background-color: #2B2D3D !important;
  }
  .main-content{
    min-height: 87vh;
  }
  .error-message {
    background-color: #ff7272;
    color: white;
    padding: 1em;
    font-weight: bold;
  }
  .success-message {
    background-color:#FF8700;
    color: white;
    padding: 1em;
    font-weight: bold;
  }
  .hidden { display:none; }
`;

export default GlobalStyle;
