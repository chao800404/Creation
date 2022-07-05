import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const theme = {
  colors: {
    brand: {
      100: '#f7fafc',
      300: '#E31E1E',
      900: '#1a202c',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },

      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '70px',
        },
      },
    },
  },
}

export default extendTheme(theme)
