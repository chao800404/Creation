import styled from 'styled-components'

export const SideContainerWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: fit-content;
  align-items: center;
  gap: 0.1rem;
`

export const DashboardContainerWrapper = styled('div')`
  height: calc(100vh - 6.2rem);
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

  .dashboardContainer_container {
    background-color: #ffffff;
    width: 100%;
    margin-top: 3.1rem;
    height: inherit;
    display: flex;

    &-right,
    &-left {
      flex: 1;
      position: relative;
    }
  }

  .dashboard_footer {
    width: 100%;
    height: 3.1rem;
    border-top: 2px solid;
  }
`

export const UploadImageContainerWrapper = styled('div')`
  height: 100%;
  color: #8c8c8c;

  .uploadImage-content {
    flex-direction: column;
    display: flex;
    height: inherit;
    gap: 0.2rem;
    width: 100%;

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
      color: #1c1c1c;
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
