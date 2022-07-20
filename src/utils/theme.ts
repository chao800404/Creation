import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const theme = {
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'brand.primary-black',
        fontWeight: '500',
        '&::-webkit-scrollbar': {
          width: '0px',
        },
        '&::-webkit-scrollbar-track': {
          width: '0px',
        },
        '&::-webkit-scrollbar-thumb': {
          display: 'none',
        },
      },
      div: {
        userSelect: 'none',
      },
      a: {
        _hover: {
          textDecoration: 'underline',
        },
      },
      ul: {
        listStyle: 'none',
      },
      input: {
        outline: 'none',
        _placeholder: {
          color: 'brand.secondary-600',
        },
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
      'seconday-900': '#666666',
      'priamry-black': '#353535',
      'primary-black-300': '#8F8F8F',
    },
  },
  lineHeights: {
    '12': '4.5rem',
  },
  sizes: {
    xss: '16rem',
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

    Tabs: {
      baseStyle: {
        tab: {
          color: 'brand.secondary-700',
          fontWeight: 900,
          _selected: {
            borderColor: 'brand.secondary-700',
          },
          _hover: {
            bg: 'brand.secondary-400',
          },
        },
      },
    },
  },
}

export default extendTheme(theme)
