import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const theme = {
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'gray.600',
        fontWeight: 'bold',
      },
      div: {
        userSelect: 'none',
      },
    },
    a: {
      _hover: {
        textDecoration: 'underline',
      },
    },
  },
  fontSize: {
    sm: '.9rem',
  },
  colors: {
    brand: {
      basic: '#B3C1E5',
      'secondary-100': '#F4F4F4',
      'secondary-400': '#EFEFEF',
      'secondary-600': '#E4E1E1',
      'secondary-700': '#888888',
      'priamry-black': '#3A3939',
    },
  },
  lineHeights: {
    '12': '4.5rem',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      sizes: {
        base: {
          h: '4rem',
          fontSize: 'lg',
          w: '10rem',
        },
        md: {
          h: '3rem',
          fontSize: 'md',
          w: '10rem',
        },
      },
    },
  },
}

export default extendTheme(theme)
