import { defineConfig } from 'windicss/helpers'
import filters from 'windicss/plugin/filters'
export default defineConfig({
  theme: {
    filter: {
      none: 'none',
      grayscale: 'grayscale(1)',
      invert: 'invert(1)',
      sepia: 'sepia(1)'
    },
    backdropFilter: {
      none: 'none',
      blur: 'blur(20px)'
    }
  },
  shortcuts: {
    'main-color-bg': 'bg-blue-600',
    'main-color': 'bg-white-100',
    'subMain-color-bg': 'bg-blue-400',
    'subMain-color-bg-active': 'bg-blue-500'
  },
  variants: {
    filter: ['responsive'],
    backdropFilter: ['responsive']
  },
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git']
  },
  plugins: [filters]
})
