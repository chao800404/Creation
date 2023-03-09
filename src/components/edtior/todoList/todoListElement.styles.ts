import styled from 'styled-components'
import { TodoListElementStyleProps } from './type'

export const TodoListWrapper = styled('div').attrs<TodoListElementStyleProps>(
  (props) => props
)<TodoListElementStyleProps>`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  align-items: center;
  line-height: ${({ lineHeight }) => !!lineHeight && lineHeight};
  justify-content: ${({ align }) => (align ? align : '')};
  margin-left: ${({ indent }) => indent && `${indent * 24}px`};

  & > div.input {
    padding: 0 2px;
    & > input[type='checkbox'] {
      vertical-align: middle;
      -webkit-appearance: none;
      margin: 0;
      padding: 0;
      line-height: initial;
      border: 1px solid rgba(0, 0, 0, 0.1);
      outline: 0;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      display: inline-block;
      -ms-flex: none;
      flex: none;
      vertical-align: middle;
      position: relative;
      width: 1rem;
      height: 1rem;
      border-radius: 4px;
      -webkit-rtl-ordering: logical;
      background-color: #fff;
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.secondary_light};

      &:focus {
        box-shadow: 0 0 0 1px rgb(32 32 32 / 30%);
      }
      &:checked {
        border-color: ${({ theme }) => theme.colors.primary};
        color: #fff;
        background-color: ${({ theme }) => theme.colors.primary_3};
        background-image: ${({ icon }) => `url(${icon})`};
      }
    }
  }

  & > span.desc {
    display: block;
    text-decoration: ${({ checked }) => (checked ? 'line-through' : '')};
    opacity: ${({ checked }) => (checked ? 0.666 : 1)};
    line-height: 1.4;
  }
`
