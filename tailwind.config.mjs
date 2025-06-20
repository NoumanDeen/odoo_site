/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'odoo-purple': '#714B67',
        'odoo-accent': '#C2A6BF',
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#714B67',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'arabic': ['Noto Sans Arabic', 'system-ui', 'sans-serif'],
        'english': ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#475569', // dark-600
            fontSize: '1.125rem', // text-lg
            lineHeight: '1.75', // leading-relaxed
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            a: {
              color: '#714B67', // odoo-purple
              textDecoration: 'underline',
              '&:hover': {
                color: '#5b21b6', // purple-800
              },
            },
            h2: {
              color: '#0f172a', // dark-900
              fontWeight: '700',
              fontSize: '1.875rem', // text-3xl
              marginTop: '2em',
              marginBottom: '1em',
            },
            h3: {
              color: '#0f172a', // dark-900
              fontWeight: '600',
              fontSize: '1.5rem', // text-2xl
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            ul: {
              listStyleType: 'disc',
              marginTop: '1.25em',
              marginBottom: '1.25em',
              paddingLeft: '1.75em',
              li: {
                marginTop: '0.5em',
                marginBottom: '0.5em',
                paddingLeft: '0.375em',
              },
            },
            ol: {
              listStyleType: 'decimal',
              marginTop: '1.25em',
              marginBottom: '1.25em',
              paddingLeft: '1.75em',
              li: {
                marginTop: '0.5em',
                marginBottom: '0.5em',
                paddingLeft: '0.375em',
              },
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#714B67', // odoo-purple
              paddingLeft: '1rem',
              color: '#475569', // dark-600
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            img: {
              borderRadius: '0.5rem', // rounded-lg
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
            strong: {
              color: '#334155', // dark-700
              fontWeight: '600',
            },
            code: {
              color: '#714B67', // odoo-purple
              fontWeight: '500',
            },
            pre: {
              backgroundColor: '#f8fafc', // dark-50
              color: '#334155', // dark-700
              borderRadius: '0.5rem',
              padding: '1rem',
              overflowX: 'auto',
            },
            hr: {
              borderColor: '#e2e8f0', // dark-200
              marginTop: '2em',
              marginBottom: '2em',
            },
            // RTL support
            '[dir="rtl"] ul, [dir="rtl"] ol': {
              paddingRight: '1.75em',
              paddingLeft: '0',
            },
            '[dir="rtl"] blockquote': {
              borderRightWidth: '0.25rem',
              borderLeftWidth: '0',
              borderRightColor: '#714B67', // odoo-purple
              paddingRight: '1rem',
              paddingLeft: '0',
            },
          },
        },
        // Add a larger variant for more spacious content
        lg: {
          css: {
            fontSize: '1.25rem', // text-xl
            h2: {
              fontSize: '2.25rem', // text-4xl
            },
            h3: {
              fontSize: '1.875rem', // text-3xl
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}