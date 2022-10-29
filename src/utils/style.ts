export const scrollBar = (hover: boolean) => ({
  '&::-webkit-scrollbar': {
    width: '0',
    zIndex: 10,
  },
  '&::-webkit-scrollbar-track': {
    width: '4px',
    zIndex: 10,
    background: '',
  },
  '&::-webkit-scrollbar-thumb': {
    background: hover ? '#000000' : 'transparent',
    borderRadius: hover ? '1rem' : '0px',
  },
})

export const placeholder = () => ({
  '&::placeholder': {
    color: 'transparent',
  },
  '&:-ms-input-placeholder': {
    color: 'transparent',
  },
  '&::-ms-input-placeholder ': {
    color: 'transparent',
  },
})
