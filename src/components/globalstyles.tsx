import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after {
      padding:0;
      margin:0;
      box-sizing:inherit;
  }
 
  html{ 
      font-family: 'Roboto';
  } 
  
  body { 
      box-sizing: border-box;
      /* @supports ( padding-top: env(safe-area-inset-top) or padding-top:env(safe-area-inset-top) ) {
        padding-top: env(safe-area-inset-top);
        padding-right: env(safe-area-inset-right);
        padding-bottom: env(safe-area-inset-bottom);
        padding-left: env(safe-area-inset-left);
      } */
     
     
      position:relative;
   
      
  }

  div:focus-visible{
    outline: none;
  }

  
  
  ::-webkit-scrollbar {
    width: 0;
    height: 0;  
  } 
  a,a:active,a:focus {
  
    text-decoration: none;
    outline:none;
  }

  img,h1,h2,h3,h4,h5,h6,p,button {
    user-select: none;
  }

 
  svg {
    display: block;
  }

  button {
    border:none;
  }

  h1 {
    font-weight: bold;
    font-size:3.5rem;
    pointer-events: none;
  }
  h2 {
    font-size: 2.5rem;
  }
  h3 {
    font-size: 2rem;
  }
`