/** @type {import('tailwindcss').Config} */

export default {
	content: [
		'./index.html',
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				c01: 'rgb(var(--scale01))',
				c02: 'rgb(var(--scale02))',
				c03: 'rgb(var(--scale03))',
				c04: 'rgb(var(--scale04))',
				c05: 'rgb(var(--scale05))',
				c06: 'rgb(var(--scale06))',
				c07: 'rgb(var(--scale07))',
				c08: 'rgb(var(--scale08))',

				bgOpacity: 'rgb(var(--containerOpacity) / <alpha-value>)',

				txt01: 'rgb(var(--text01))',
				txt02: 'rgb(var(--text02))',

				bgModal: 'rgb(var(--bgContainer) / <alpha-value>)',
				grid: 'rgb(var(--grid))',
				line: 'rgb(var(--line))',
				bar: 'rgb(var(--bar))',

				violetGradient: '`linear-gradient(to right, rgb(var(--violet-primary)), rgb(var(--violet-secondary)))`',
				violetGradient2: '`linear-gradient(to right, rgb(var(--violet-quintenary)), rgb(var(--violet-sextenary)))`',
				yellowGradient: '`linear-gradient(to right, rgb(var(--yellow-primary)), rgb(var(--yellow-secondary)))`',
				yellowGradient2: '`linear-gradient(to right, rgb(var(--yellow-quintenary)), rgb(var(--yellow-sextenary)))`',

				overlay: 'rgba(0, 0, 0 , 1)',
				btn: 'rgb(var(--btn))',
				btn2: 'rgb(var(--btn2))',
				btn3: 'rgb(var(--btn3))',

				customGradient: 'linear-gradient(to right, rgb(var(--btn)), rgb(var(--bt2)), rgb(var(--bt3)))',

				hover: {
					btn: 'rgb(var(--violet-secundary))',
					btn2: 'rgb(var(--violet-secondary))'
				},

				background: 'hsl(var(--background))',

				backgroundImage: {
					customGradient: 'linear-gradient(to right, rgb(var(--btn)), rgb(var(--bt2)), rgb(var(--bt3)))',
					// image1: 'url('/background/01.png')',
					// image2: 'url('/background/02.png')',
					// image3: 'url('/background/03.png')',
					// image4: 'url('/background/04.png')',
					// image5: 'url('/background/05.png')'
				},
				grayscale: {
					c0: '#FFFFFF',
					c1: '#F7F7F7',
					c2: '#E7E7E7',
					c3: '#DEDEDE',
					c4: '#CCCCCC',
					c5: '#B3B3B3',
					c6: '#9C9C9C',
					c7: '#707070',
					c8: '#595959',
					c9: '#404040',
					c10: '#2E2E2E',
					c11: '#111111',
					c12: '#000000'
				},
			},
			margin: {
				'12px': '12px',
				'60px': '60px'
			},
			fontSize: {
				sm: '22px',
				normal: '26px',
				md: '32px',
				lg: '32px',
				xl: '36px',
				'2xl': '48px',
				'3xl': '48px',
				'4xl': '48px'
			},
			lineHeight: {
				sm: '22px',
				normal: '26px',
				md: '32px',
				lg: '32px',
				xl: '36px',
				'2xl': '48px',
				'3xl': '48px',
				'4xl': '48px'
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			},
			boxShadow: {
				box: '4px 1px 12px 0px rgba(0, 0, 0, .25)',
				box2: '4px 1px 12px 0px rgba(0, 0, 0, 5)',
				light: '4px 1px 12px 0px rgba(255, 255, 255, .25)',
				light2: '4px 1px 12px 0px rgba(255, 255, 255, 5)'
			},
			dropShadow: {
				'3xl': '0 35px 35px rgba(255, 255, 255, 0.09)',
				'4xl': '0 35px 35px rgba(0, 0, 0, 0.25), 0 45px 65px rgba(0, 0, 0, 0.15)'
			},
			animation: {
				loader: 'loader 1s linear infinite',
				toRight: 'toRight .2s ease forwards',
				rotate: 'rotate 2s linear infinite',
				dash: 'dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite'
			},
			keyframes: {
				loader: {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				toRight: {
					'0%': {
						transform: 'translateX(0)'
					},
					'100%': {
						transform: 'translateX(8px)'
					}
				},
				rotate: {
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				dash: {
					'0%': {
						'stroke-dasharray': '1, 200',
						'stroke-dashoffset': '0'
					},
					'50%': {
						'stroke-dasharray': '89, 200',
						'stroke-dashoffset': '-35px'
					},
					'100%': {
						'stroke-dasharray': '89, 200',
						'stroke-dashoffset': '-124px'
					}
				},
				color: {
					'0%, 100%': {
						stroke: 'rgb(var(--loader01))'
					},
					'40%': {
						stroke: 'rgb(var(--loader02))'
					},
					'66%': {
						stroke: 'rgb(var(--loader03))'
					},
					'80%, 90%': {
						stroke: 'rgb(var(--loader04))'
					}
				}
			},
		}
	},
	darkMode: ['class', 'class']
};