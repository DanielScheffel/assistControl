import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  html,
  body,
  #root{
    width:100%;
    min-height:100vh;
  }

  body{
    font-family: Arial, Helvetica, sans-serif;
    background:${({theme}) => theme.colors.background};
    color:${({theme}) => theme.colors.text};
  }

  button{
    border:none;
    outline:none;
    cursor:pointer;
    font-family:inherit;
  }

  input,
  textarea,
  select{
    outline:none;
    font-family:inherit;
  }

  a{
    color:inherit;
    text-decoration:none;
  }

`;