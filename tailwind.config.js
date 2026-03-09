/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#67dbec',
					50: '#f0fdff',
					100: '#ccf7fe',
					200: '#99eefb',
					300: '#67dbec',
					400: '#22c5de',
					500: '#06a6c0',
					600: '#0784a0',
					700: '#0c6b82',
					800: '#14566a',
					900: '#15485a'
				},
				dark: '#0a0a0a',
				surface: '#111111',
				'surface-2': '#1a1a1a',
				'surface-3': '#222222'
			},
			fontFamily: {
				sans: ['Inter', 'Be Vietnam Pro', 'system-ui', 'sans-serif'],
				display: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
			},
			animation: {
				'fade-up': 'fadeUp 0.6s ease-out forwards',
				'fade-in': 'fadeIn 0.4s ease-out forwards',
				'slide-left': 'slideLeft 0.6s ease-out forwards',
				'slide-right': 'slideRight 0.6s ease-out forwards',
				float: 'float 6s ease-in-out infinite',
				glow: 'glow 2s ease-in-out infinite alternate',
				shimmer: 'shimmer 2s linear infinite',
				'spin-slow': 'spin 8s linear infinite',
				'pulse-glow': 'pulseGlow 2s ease-in-out infinite'
			},
			keyframes: {
				fadeUp: {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideLeft: {
					'0%': { opacity: '0', transform: 'translateX(-30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				slideRight: {
					'0%': { opacity: '0', transform: 'translateX(30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				glow: {
					'0%': { boxShadow: '0 0 20px rgba(103, 219, 236, 0.3)' },
					'100%': { boxShadow: '0 0 40px rgba(103, 219, 236, 0.7)' }
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				pulseGlow: {
					'0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(103, 219, 236, 0.4)' },
					'50%': { opacity: '0.8', boxShadow: '0 0 60px rgba(103, 219, 236, 0.8)' }
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				noise:
					"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
			}
		}
	},
	plugins: []
};
