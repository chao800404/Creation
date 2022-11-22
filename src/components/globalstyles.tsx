import { createGlobalStyle, DefaultTheme } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after {
      padding:0;
      margin:0;
      box-sizing:inherit;
  }
 
  html{ 
    font-family: 'Robot', sans-serif;
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
    font-size:1rem;

    
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
    cursor: pointer;
  }

  h1 {
    font-weight: bold;
    font-size:2.5rem;
    pointer-events: none;
  }
  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size:1.5rem;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid #c3c3c3;
  }


  code {
    background-color: #c3c3c3;
    color: #616161;
  }

  .pl_m {
    padding-left: .5rem;
  }
  .pr_m {
    padding-right: .5rem;
  }

  .p_m {
    padding:.5rem;
  }

  .round_sm {
    border-radius: 5px;
  }

  .round_m {
    border-radius: 0.5rem;
  }

  .center {
    display:flex;
    align-items: center;
    justify-content:center;
  }

  .caption {
    font-family: 'Exo', sans-serif;
    font-size: .8rem;
    font-weight: 700;
  }


  .add_block-input{
    li {
      font-size: 1rem;
      margin-left: 1rem;
      font-weight: 400;
    }
  }


  div[data-name="Bullested_list"] {
      li {
        list-style: square;
      }
    }

  div[data-name="Numbered_list"] {
      li {
        list-style: number;
      }
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;
 
    p {
      margin-left: .1rem;
    }
  
    li {
      display: flex;
      align-items: center;
      margin-left:0;
  
      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;

        > input {
          margin:auto -.2rem;
          display:block;
          accent-color:#1c1c1c;

        }
      }
  
      > div {
        flex: 1 1 auto;
      }
    }
  }


  .ProseMirror {

    h1.is-empty:first-child::before,
    h2.is-empty:first-child::before,
    h3.is-empty:first-child::before,
    p.is-empty:first-child::before
     {
      content: attr(data-placeholder);
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      color: #efefef;
      width: 100%;
      pointer-events: none;
    }

    h1.is-empty:first-child::before {
      font-size:1.5rem;
    }

    p.is-empty:first-child::before{
      font-size:1rem;
    }
/* 
    div[data-name="Bullested_list"] div[data-name="Numbered_list"] {
      li {
        margin-left:1rem;
        font-size: 1rem;
      }
    } */


 

    p {
      font-size: 1rem;
      height: fit-content;
      line-height: 1.4;
    }


    pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    }

  

  
    hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
    }
  
    
  }



`

type themeKey =
  | 'primary'
  | 'secondary'
  | 'secondary_light'
  | 'secondary_dark'
  | 'white'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      readonly [key in themeKey]: string
    }
  }
}

export const theme: DefaultTheme = {
  colors: {
    primary: '#1c1c1c',
    secondary: '#f4f4f4',
    secondary_light: '#efefef',
    secondary_dark: '',
    white: '#ffffff',
  },
}
