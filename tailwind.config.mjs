/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f4f5f0',
          100: '#e3e6db',
          200: '#c7cdb7',
          300: '#a3ad8e',
          400: '#7d8a69',
          500: '#5e6c4e',
          600: '#4a553f',
          700: '#3d4534',
          800: '#323a2d',
          900: '#2b3128',
          950: '#161913',
        },
        brand: {
          500: '#4a553f',
          600: '#3d4534',
          700: '#323a2d',
        },
        accent: {
          500: '#c4b998',
          600: '#a89e7e',
        },
        warm: {
          50: '#faf8f5',
          100: '#f3ede4',
          200: '#e8ddd0',
          300: '#d4c4a8',
        },
        surface: {
          DEFAULT: '#0f0f0e',
          elevated: '#1a1a19',
          raised: '#252523',
          border: '#2a2a28',
        },
        neutral: {
          50: '#f5f5f5',
          100: '#e6e6e6',
          200: '#d1d1d1',
          300: '#a8a8a8',
          400: '#8c8c8c',
          500: '#6b6b6b',
          600: '#525252',
          700: '#3a3a3a',
          800: '#262626',
          900: '#171717',
        },
        whatsapp: '#25D366',
        success: '#4a553f',
        error: '#c44a4a',
        warning: '#d4a23a',
        'dark-bg': '#0f1712',
        'dark-surface': '#18231c',
        'dark-card': '#1e2d24',
        'dark-border': '#2a3a2e',
        'light-bg': '#f5f3ec',
        'light-surface': '#ffffff',
        'light-card': '#ffffff',
        'light-border': '#e5e2d8',
        'primary': '#5f7152',
        'primary-light': '#738a5e',
        'primary-hover': '#2f4f3a',
        'secondary': '#c4b998',
        'secondary-dark': '#a89e7e',
        'secondary-light': '#d4c9a8',
        'text-muted': '#9a968e',
        'text-faint': '#6b6660',
        'text-white': '#faf8f5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.02em',
      },
      lineHeight: {
        'tight': '1.1',
        'snug': '1.3',
      },
    }
  },
  plugins: []
}
