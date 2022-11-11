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
  }

  
  textarea {
    border: none;
    outline: none;
    resize: none;
    font-weight: 700;
    font-family: Roboto;

    
    &::placeholder {
      color: #EFEFEF;
    }
  }

  li {
    list-style: none;
    font-size: .5rem;
    font-weight: 700;
  }

  a,a:active,a:focus {
  
    text-decoration: none;
    outline:none;
    color: #1c1c1c;
  }
  
  button,li,Ul:focus,div:focus-visible {
    outline: none;
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
    font-size:2.5rem;
    pointer-events: none;
  }
  h2 {
    font-size: 2.2rem;
  }

  .ProseMirror {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }

    p {
      font-size: 1.25rem;
      height: fit-content;
    }

    code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
    }

    pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    blockquote {
      padding-left: 1rem;
      border-left: 2px solid rgba(#0D0D0D, 0.1);
    }
    
    hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
    }
  }


    
  }

`
