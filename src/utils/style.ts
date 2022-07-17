export const scrollBar = (hover: boolean) => ({
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: hover ? '#888888' : 'transparent',
    borderRadius: hover ? '1rem' : '0px',
  },
})
