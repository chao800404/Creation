import { createGlobalStyle, DefaultTheme } from 'styled-components'
import 'tippy.js/dist/tippy.css'

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

  :root {
    --primary:#1c1c1c;
    --primary_2: #747474;
    --primary_3: #555;
    --primary_high: #cccccc;
    --primary_high_2:#393939;
    --primary_dark: #000000;
    --secondary: #f4f4f4;
    --secondary_light: #efefef;
    --secondary_light_2: #F1F1F1;
    --secondary_dark: ;
    --tertiary: #e8f0fe;
    --white: #ffffff;
  }
  
  textarea {
    border: none;
    outline: none;
    resize: none;
    font-size:1rem;
    font-weight: 800;
    font-family: 'Inter Tight', sans-serif;
    
    &::placeholder {
      color: #EFEFEF;
    }
  }

  li {
    list-style: none;
    font-size: .5rem;
    
    p {
      padding-left: 0.3rem;
    }
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



  svg {
    display: block; 
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
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }


  code {
    background-color: #c3c3c3;
    color: white;
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


  .has-focus {
    background-color: red;
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

  .slate-p {
    line-height: 1;
  }

  .slate-align-center{
    text-align: center;
    position: relative;
    &::before{
      left:50%;
      transform: translateX(-50%);
      width:10rem;
    }
  }

  .slate-align-right {
    text-align: right;
    position: relative;
    &::before{
      right:0;
    }
  }

  hr.slate-HrElement-hr {
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  hr.bGpDwk {
    background-color: #747474;
  }

  pre.slate-code_block {
    background-color:#1c1c1c;
    margin-top:0.5rem;
    margin-bottom:0.5rem;

    & > select {
      background-color: #1c1c1c;
      color: white;

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

    span {

      & >.keyword {
        color: #C792EA;
      }

      & >.operator 
      >.url {
        color:#9a6e3a;
      }

      & >.comment {
        color: slategray;
      }
      
      & >.variable, 
      >.regex {
        color: #e90;
      }

      & >.boolean, 
      >.number, 
      >.constant, 
      >.symbol,
      >.selector {
        color: #FBBC88;
      }

      

      & >.punctuation{
        color: #89DDFF;
      }

      & >.string,
      >.char,
      >.tag {
        color: #C3E88D;
      }

      & >.function {
        color: #dd4a68;
      }

      & >.literal-property{
        color: #F07178
      }
    }
  }


  .tippy_style {
    background-color:#1c1c1c;
    padding:0.3rem 0.5rem;
    color: #F0F0F0;
    border-radius: 5px;
    font-size: 0.8rem;
  }


  button[data-testid="ToolbarButton"]{
    color:#C0C0C0;
  }


  .slate-mark_selector-1-active,
  .slate-mark_selector-2-active,
  .slate-ToolbarButton-active{
    color:black !important;    
  }

  .mark_selector{
    display: flex;
    position: relative;
    margin-right: 8px;
    /* transform: translateY(1px); */

    &-drop {
      position: relative;
      width: 4px;
      right: 8px;
      top: 8px;

      svg {
        cursor: pointer;
      }
    }

    &-popup {
      background-color: #1c1c1c;
      border-radius: 5px;
      width: auto;
      box-shadow: 0 0 .2rem rgba(0,0,0,0.5);
      border: 1px solid #555;
      padding:0;
      display: flex;
      flex-direction: column;
      padding:0.3rem 0;
    


      &-item {
        display: flex;
        align-items: center;
        color: white;
        padding: 0.2rem 0.8rem;
        cursor: pointer;

        &:hover {
          background-color:#555;
        }

        & > span:nth-child(1){
          width: 0.6rem;
          font-size: 0.7rem;
          color: green;
          display: flex;
        }

        & > span:nth-child(2){
          height: 1.3rem;
          padding:0 0.5rem;
          display: flex;
          align-items: center;

          svg {
            width: 1.2rem;
            height: 1.2rem;
          }
        }

        & > span:nth-child(3){
          font-size: 0.6rem;
        }
      }
    }
  }

  [data-testid="ColorPicker"]{
    border: 2px solid #555;
    border-radius: 5px;
    box-shadow: 0 0 0.1rem rgba(0,0,0,0.1);

    & > div > div {
      button {
        width: 95%;
        font-weight: 900;

        &:hover {
          background-color:#1c1c1c;
          color: white;
        }
      }
    }
  

    & > button[data-testid="ColorPickerClear"]{
      width: 95%;
      font-weight: 900;

      &:hover {
        background-color:#1c1c1c;
        color: white;
      }
    }


    button[data-testid="ColorButton"]{
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        box-shadow: unset;
        border: 2px solid #1c1c1c;
        box-sizing: content-box;
      }

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }

  
  .tippy-box[data-theme~='dark'] {
    background-color: #1c1c1c;
    color: #c0c0c0;
    font-size: 0.5rem;
    border-radius: 5px;
    font-weight: 700;
  }

  .TtHLj {
    border-radius: 5px;
    .iflLRb{
      box-shadow: 0 0 0.5rem rgba(0,0,0,0.2);
      border: 2px solid #1c1c1c;

      & > nav#emoji-nav {
        & > div > div {
          background-color: #1c1c1c;
        }
      }

      input[type="text"]{
        &::placeholder{
        
        }
      }

      svg {
        fill: #1c1c1c;
      }

      [data-id="scroll"]{
        &::-webkit-scrollbar{
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #1c1c1c;
          border: unset;
        }
      }
    }
  }

  .diuqSz {
    box-shadow: 0 0 0.2rem rgba(0,0,0,0.3) !important;
    background: #1c1c1c !important;;
    
    & > div.cKeavz {
      input {
        color: white !important;;

        &::placeholder {
          color: #ccc !important;;
        }
      }
    }
  }
  .hbmPqc {
    background: #1c1c1c;
    color: white;
    border-radius: 5px;

    .jYjDDa {
      background-color: #555;
    }
    button , a {
      background: inherit;
      color: inherit;

      &:hover {
        background: inherit;
        color:#cccccc;
      }
    }
  }

 
`

type themeKey =
  | 'primary'
  | 'primary_high'
  | 'primary_2'
  | 'primary_3'
  | 'primary_dark'
  | 'primary_high_2'
  | 'secondary'
  | 'secondary_light'
  | 'secondary_light_2'
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
    primary: 'var(--primary)',
    primary_2: 'var(--primary_2)',
    primary_3: 'var(--primary_3)',
    primary_high: 'var(--primary_high)',
    primary_high_2: 'var(--primary_high_2)',
    primary_dark: 'var(--primary_dark)',
    secondary: 'var(--secondary)',
    secondary_light: 'var(--secondary_light)',
    secondary_light_2: 'var(--secondary_light_2)',
    secondary_dark: '',
    tertiary: 'var(--tertiary)',
    white: 'var(--white)',
  },
}
