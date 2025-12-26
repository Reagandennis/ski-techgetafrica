import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Primary brand red (extracted from Techgetafrica logo)
				// Used for primary CTAs, active states, and accents
				'brand-red': '#EF4444',
				'brand-red-dark': '#DC2626',
				'brand-red-light': '#F87171',

				// Primary black for institutional strength and headings
				'brand-black': '#1F2937',
				'brand-black-dark': '#111827',

				// Neutral grays for body text, borders, and backgrounds
				'neutral-50': '#F9FAFB',
				'neutral-100': '#F3F4F6',
				'neutral-200': '#E5E7EB',
				'neutral-300': '#D1D5DB',
				'neutral-400': '#9CA3AF',
				'neutral-500': '#6B7280',
				'neutral-600': '#4B5563',
				'neutral-700': '#374151',
				'neutral-800': '#1F2937',
				'neutral-900': '#111827',

				// Professional blues for secondary actions and info states
				'accent-blue': '#2563EB',
				'accent-blue-light': '#DBEAFE',
				'accent-blue-dark': '#1D4ED8',

				// Success state
				'success-green': '#10B981',
				'success-green-light': '#D1FAE5',

				// Warning state
				'warning-amber': '#F59E0B',
				'warning-amber-light': '#FEF3C7',

				// Error state
				'error-red': '#EF4444',
				'error-red-light': '#FEE2E2',
			},
			fontFamily: {
				// Clean sans-serif stack matching Coursera's aesthetic
				'sans': [
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'sans-serif',
				],
				'display': [
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'sans-serif',
				],
			},
			fontSize: {
				// Institutional typography scale
				'xs': '0.75rem',
				'sm': '0.875rem',
				'base': '1rem',
				'lg': '1.125rem',
				'xl': '1.25rem',
				'2xl': '1.5rem',
				'3xl': '1.875rem',
				'4xl': '2.25rem',
				'5xl': '3rem',
			},
			fontWeight: {
				light: '300',
				normal: '400',
				medium: '500',
				semibold: '600',
				bold: '700',
				extrabold: '800',
			},
			spacing: {
				// Generous spacing for professional, spacious layout
				0: '0',
				1: '0.25rem',
				2: '0.5rem',
				3: '0.75rem',
				4: '1rem',
				5: '1.25rem',
				6: '1.5rem',
				7: '1.75rem',
				8: '2rem',
				9: '2.25rem',
				10: '2.5rem',
				12: '3rem',
				14: '3.5rem',
				16: '4rem',
				20: '5rem',
				24: '6rem',
				28: '7rem',
				32: '8rem',
				36: '9rem',
				40: '10rem',
				44: '11rem',
				48: '12rem',
				52: '13rem',
				56: '14rem',
				60: '15rem',
				64: '16rem',
				72: '18rem',
				80: '20rem',
				96: '24rem',
			},
			borderRadius: {
				'none': '0',
				'sm': '0.25rem',
				'base': '0.375rem',
				'md': '0.5rem',
				'lg': '0.75rem',
				'xl': '1rem',
				'2xl': '1.25rem',
				'3xl': '1.5rem',
				'full': '9999px',
			},
			boxShadow: {
				// Subtle, professional shadows
				'none': 'none',
				'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
			},
			opacity: {
				0: '0',
				5: '0.05',
				10: '0.1',
				20: '0.2',
				30: '0.3',
				40: '0.4',
				50: '0.5',
				60: '0.6',
				70: '0.7',
				75: '0.75',
				80: '0.8',
				90: '0.9',
				95: '0.95',
				100: '1',
			},
		},
	},
	plugins: [],
};

export default config;
