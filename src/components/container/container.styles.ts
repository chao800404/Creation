import styled from 'styled-components'

export const SideContainerWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: fit-content;
  align-items: center;
`
type SideContainerType = {
  left?: number | string
}

export const SideContainerWrapperS = styled.div.attrs<SideContainerType>(
  (props) => ({
    left: props.left,
  })
)<SideContainerType>`
  position: relative;
  z-index: 1;

  .active {
    &::after {
      content: '';
      width: fit-content;
      height: 100%;
      position: absolute;
      top: 0;
      left: ${({ left }) =>
        Number(left) > 0 ? `${Number(left) + 1.5}rem` : '1.2rem'};
      border-left: ${({ theme }) => `1.5px solid ${theme.colors.primary_high}`};
      z-index: 300;
      pointer-events: none;
    }
  }
`

export const DashboardContainerWrapper = styled('main')`
  height: 100vh;
  margin-left: 14px;

  .dashboard_nav {
    width: inherit;
    height: 3.1rem;
    border-bottom: 2px solid;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    z-index: 3000;
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }

  .dashboardContainer_main {
    max-width: 1200px;
    min-width: 800px;
    position: relative;
    border-right: 2px solid;
    border-left: 2px solid;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .dashboardContainer_container {
    background-color: #ffffff;
    width: 100%;
    padding: 3.1rem 0;
    height: 100%;
    display: flex;

    &-right,
    &-left {
      flex: 1;
      position: relative;
    }
  }

  .dashboardContainer_label {
    height: 2rem;
    width: 100%;
    position: sticky;
    display: flex;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }

  .dashboard_footer {
    width: inherit;
    height: 3.1rem;
    border-top: 2px solid;
    bottom: 0;
    position: fixed;
    z-index: 3000;
    background-color: #ffffff;
  }
`

export const UploadImageContainerWrapper = styled('div')`
  height: 100%;
  color: #8c8c8c;
  width: 100%;
  gap: 0.2rem;
  flex-direction: column;
  display: flex;

  .uploadImage-content {
    &-box {
      display: block;
      width: inherit;
      flex: 1;
      position: relative;

      &-cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    &-desc {
      text-align: center;
      padding: 0.2rem;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &-btn {
      color: primary;
      position: relative;
      width: inherit;
      background-color: #e1e1e1;
      padding: 0.5rem;
      border-radius: 3px;
      font-weight: 700;
      font-size: 1rem;
    }
  }
`

export const SelectImageContainerWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.3rem;
  row-gap: 0.2rem;
  margin-top: 0.5rem;
  width: inherit;

  .selectImage-header {
    grid-column: 1 / -1;
    font-size: 1;
    padding: 0.2rem;
  }

  .selectImage-content {
    width: 100%;
    height: 3.5rem;
    position: relative;
    border-radius: 2px;
    overflow: hidden;
    margin-top: 0.1rem;
    cursor: pointer;
  }
`
export const EmojiContainerWrapper = styled('div')`
  width: 100%;
  padding: 0.5rem;

  .emoji-preload {
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const EmojiComponentWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.8rem;
  position: relative;
  margin-top: 1rem;

  .emoji-content {
    grid-column: span 1;
    position: relative;
    height: 2rem;
    cursor: pointer;
    padding: 0.1rem;

    &:hover {
      background-color: #efefef;
    }
  }
`

type SelectBlockItemType = {
  isActive: boolean
}

export const SelectBlockItem = styled('li').attrs<SelectBlockItemType>(
  ({ isActive }) => ({ isActive })
)<SelectBlockItemType>`
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary_light};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary_light : theme.colors.white};

  .select_block-btn {
    &-icon {
      grid-column: span 1;
      grid-row: span 2;
    }
  }

  .heightlight {
    color: red;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_light};
  }

  button {
    display: grid;
    width: inherit;
    grid-template-columns: 3.5rem 1fr;
    grid-template-rows: repeat(2, 1fr);
    column-gap: 0.5rem;
    background-color: inherit;
    cursor: pointer;
    span {
      &:nth-child(1) {
        grid-column: 1/2;
        grid-row: 1/3;
        position: relative;
        width: 3rem;
        height: 3rem;
        justify-self: center;
        border-radius: 2px;
        border: 1px solid #efefef;
      }

      &:nth-child(2) {
        grid-column: 2/3;
        grid-row: 1/2;
        font-size: 0.8rem;
        font-weight: 700;
      }
      &:nth-child(3) {
        grid-column: 2/ 3;
        grid-row: 2/3;
        width: inherit;
        font-size: 0.5rem;
        color: #c3c3c3;
        text-overflow: ellipsis;
        text-align: start;
        white-space: nowrap;
        overflow: hidden;
      }

      &:nth-child(2),
      &:nth-child(3) {
        justify-self: start;
        align-self: center;
      }
    }
  }
`

export const BlockReviewWrapper = styled.aside`
  width: 100%;
  height: 100%;

  .blockReview-header {
    width: inherit;
    height: 2rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};

    p {
      inset: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0.4rem 0.5rem;
      font-size: 0.5rem;
      font-weight: bold;
      text-align: center;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .blockReview-content {
    padding: 0.5rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
`
