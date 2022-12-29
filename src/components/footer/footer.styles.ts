import styled from 'styled-components'

export const DashboardFooterWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;

  & > .footer_user_info {
    border: 1px solid;
    height: 2rem;
    width: 10rem;
    display: grid;
    grid-template-columns: 2rem 1fr;
    padding: 0.5rem 0;
    gap: 0.5rem;
    box-shadow: 0rem 0.2rem ${({ theme }) => theme.colors.primary};

    & > span:nth-child(1) {
      grid-column: 1 / 2;
      color: ${({ theme }) => theme.colors.primary};
      border-right: 2px solid ${({ theme }) => theme.colors.primary};
    }

    & > span:nth-child(2) {
      grid-column: 2 / -1;
      font-size: 0.8rem;
      align-self: center;
      font-weight: bold;
    }
  }

  & > .footer_info {
    width: 8rem;
    height: 2rem;
    margin-right: 0.5rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    display: grid;
    grid-template-columns: 2rem 1fr 2rem;
    box-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
    user-select: none;
    cursor: pointer;

    & > span {
      align-self: center;
      display: block;
    }

    & > span:nth-child(1) {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      grid-column: 1 / 2;
      justify-self: center;
    }

    & > span:nth-child(2) {
      justify-self: start;
      font-size: 0.8rem;
      margin-bottom: 0.1rem;
    }

    & > span:nth-child(3) {
      color: ${({ theme }) => theme.colors.primary_high};
    }
  }
`
