import styled from 'styled-components'

type LinkButton = {
  open: boolean
  isFocus: boolean
}

export const LinkButtonWrapper = styled('div').attrs<LinkButton>(
  (props) => props
)<LinkButton>`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  position: relative;

  button {
    height: 2rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    font-weight: 700;
    box-shadow: 0 2px 0.3rem rgba(0, 0, 0, 0.3);
  }

  span.link_button-content {
    min-width: 6rem;
    display: grid;
    grid-template-columns: 2rem 1fr;

    &-emoji {
      grid-column: 1 / 2;
      align-self: center;
      justify-self: center;
    }

    &-name {
      grid-column: 2 / 3;
      align-self: center;
      justify-self: center;
      margin-right: 0.5rem;
      min-width: 0.2rem;
    }
  }

  span[data-slate-node='text'] {
    max-width: 10rem;
    display: block;
    text-overflow: ${({ isFocus }) => (isFocus ? 'clip' : 'ellipsis')};
    overflow: hidden;
    white-space: ${({ isFocus }) => (isFocus ? 'pre' : 'nowrap')};
    direction: ${({ isFocus }) => (isFocus ? 'unset' : 'rtl')};
  }

  span.link_button-controller {
    width: 2rem;
    height: 100%;
    margin: auto;
    border-left: 1px solid ${({ theme }) => theme.colors.primary_2};
    background-color: ${({ theme }) => theme.colors.primary_high_2};

    svg {
      width: 1.5rem;
      display: block;
      transform: ${({ open }) => `rotate(${open ? '90deg' : '0deg'})`};
      transition: all 0.3s ease-in-out;
    }
  }

  div.link_button-popup {
    position: absolute;
    bottom: -15.5rem;
    z-index: 30;
  }
`
export const LinkButoonPopupItemWrapper = styled('div')`
  padding: 0.3rem 0.5rem;
  display: flex;
  gap: 0.5rem;

  .linkPopup-desc {
    font-size: 0.9rem;
    line-height: 1;
    display: block;
    margin: auto 0;
  }
`
