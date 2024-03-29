import styled from 'styled-components'

export const LineHeightDropdownWrapper = styled('div')`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.3rem 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;

  & > div.toolbarDropdown-item {
    padding: ${({ theme: { padding } }) => `${padding.pd_sm} ${padding.pd_md}`};
    display: flex;
    align-items: center;

    & > span {
      &:nth-child(1) {
        font-size: 0.5rem;
        margin-right: 0.2rem;
        color: green;
        width: 1.2rem;
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary_3};
    }
  }
`
