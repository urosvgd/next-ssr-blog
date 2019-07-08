module.exports = {
  theme: {
    fontFamily: {
      body:
        '"Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      mono:
        '"Ubuntu Mono", monospace',
    },
    extend: {
      colors: {
        primary: { default: '#C75000', light: '#e4570e' },
        brand: { default: '#ea6912', light: '#e4570e' },
        //header: '#fcfcfc',
        header: 'var(--header-color)',
        bg: { default: 'var(--bg-color)', light: '#fff', dark: '#1A1A1A'},
      },
      fill: {
        logo: 'var(--logo-color)',
      },
      textColor: {
        primary: 'var(--text-color)',
        secondary: 'var(--text-color-secondary)',
        tertiary: 'var(--text-color-tertiary)',
      }
    },
  },
  variants: {},
  plugins: [],
};
