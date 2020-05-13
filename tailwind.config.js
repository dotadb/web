module.exports = {
  plugins: [],
  purge: ['./**/*.tsx', './assets/global.scss'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji'
        ]
      },
      width: {
        'hero-md': 'calc(100% / 4 - 2rem)',
        'hero-sm': 'calc(100% / 2 - 2rem)',
        'item-md': 'calc(100% / 6 - 2rem)',
        'item-sm': 'calc(100% / 3 - 2rem)'
      }
    }
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'group-hover']
  }
}
