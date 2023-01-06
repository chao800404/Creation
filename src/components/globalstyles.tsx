import { createGlobalStyle, DefaultTheme } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after {
      padding:0;
      margin:0;
      box-sizing:inherit;
  }
 
  html,input , button  { 
    font-family: 'Inter Tight', sans-serif;
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
    font-size:1rem;
    font-weight: 800;

    
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
    color: #1c1c1c;
    cursor: pointer;
  }
  
  button,select,li,ul:focus,div:focus-visible {
    outline: none;
    border: none;
  }

  button {
    cursor:pointer;
  }

  img,h1,h2,h3,h4,h5,h6,p,button {
    user-select: none;
  }

  svg {
    display: block;
    
  }

  select {
    background: #1c1c1c;
    border: none;
    color:white;
    display: flex;
    justify-content:center;
    

    option {
      color:inherit;
      display: block;
    }
  }


  h1 {
    font-weight: bold;
    font-size:2.25rem;
    pointer-events: none;
  }
  h2 {
    font-size: 1.875rem;
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

  .heightligh {
    color:red;
  }



  div[data-name="Bullested_list"] {
      li {
        list-style: square;
        margin-left:1.2rem;
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
      margin-left: -0.1rem;
    }
  
    li {
      display: flex;
      margin-left:0;
  
      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
        margin-top: 0.4rem;


        > input {
          display:block;
          accent-color:#1c1c1c;
        
        }
      }
  
      > div {
        flex: 1 1 auto;
      }
    }
  }


  .tableWrapper {
    padding: 0;
    overflow-x: auto;
    cursor: default!important;
  


    &::-webkit-scrollbar {
      width: 100%;
      height:.5rem;
    }


    &::-webkit-scrollbar-thumb {
      background: #555;

      &:hover {
        background: #1c1c1c;
      }
    }
  }

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }


  .ProseMirror {
    p,h1,h2,h3,h4,h5,h6,div{
      outline: none;
    }


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
      font-size:inherit;
    }

    p.is-empty:first-child::before{
      font-size:1rem;
    }

    p {
      font-size: 1rem;
      height: fit-content;
      line-height: 1.4;
    }


    pre {
      background: rgb(25, 25, 25);
      color: #FFF;
      font-family: 'JetBrainsMono', monospace;
      padding: 1.5rem;
      border-radius: 0.5rem;
      code {
        background: none;
        color: inherit;
        font-size: .9rem;
        padding: 0;
        line-height: 1.5;
      }
  
      .hljs-comment,
      .hljs-quote {
        color: #616161;
      }
  
      .hljs-variable,
      .hljs-template-variable,
      .hljs-attribute,
      .hljs-tag,
      .hljs-name,
      .hljs-regexp,
      .hljs-link,
      .hljs-name,
      .hljs-selector-id,
      .hljs-selector-class {
        color: #f98181;
      }
  
      .hljs-number,
      .hljs-meta,
      .hljs-built_in,
      .hljs-builtin-name,
      .hljs-literal,
      .hljs-type,
      .hljs-params {
        color: #fbbc88;
      }
  
      .hljs-string,
      .hljs-symbol,
      .hljs-bullet {
        color: #b9f18d;
      }
  
      .hljs-title,
      .hljs-section {
        color: #ff4a32;
      }
  
      .hljs-keyword,
      .hljs-selector-tag {
        color: #dd93ff;
      }
  
      .hljs-emphasis {
        font-style: italic;
      }
  
      .hljs-strong {
        font-weight: 700;
      }

    }


    table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;
      tr {
        min-height: 2rem;
      }    
    
  
      td,
      th {
        border: 2px solid #ced4da;
        box-sizing: border-box;
        width: 10rem;
        padding: 3px 5px;
        position: relative;
        vertical-align: top;
        cursor:text;
        

        > * {
          margin-bottom: 0;
        }

        &:focus {
          background: red;
        }
      }
  
      th {
        background-color: #f1f3f5;
        font-weight: bold;
        text-align: left;
      }
  
      .selectedCell:after {
        background: rgba(87, 104, 93, 0.4);
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        position: absolute;
        z-index: 2;
      }

      
  
      .column-resize-handle {
        background-color: rgba(0,0,0,.5);
        bottom: -2px;
        position: absolute;
        right: -2px;
        pointer-events: none;
        top: 0;
        width: 4px;
        cursor: ew-resize;
        cursor: col-resize;
      }

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
  | 'primary_high'
  | 'primary_2'
  | 'primary_dark'
  | 'primary_high_2'
  | 'secondary'
  | 'secondary_light'
  | 'secondary_dark'
  | 'tertiary'
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
    primary_2: '#747474',
    primary_high: '#cccccc',
    primary_high_2: '#393939',
    primary_dark: '#000000',
    secondary: '#f4f4f4',
    secondary_light: '#efefef',
    secondary_dark: '',
    tertiary: '#e8f0fe', // #e8f0fe
    white: '#ffffff',
  },
}
