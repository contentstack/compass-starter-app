/* eslint-disable @typescript-eslint/no-require-imports */
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
const config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    darkMode: ['class'],
    theme: {
        colors: {
            'tahiti': {
                100: '#cffafe',
                200: '#a5f3fc',
                300: '#67e8f9',
                400: '#22d3ee',
                500: '#06b6d4',
                600: '#0891b2',
                700: '#0e7490',
                800: '#155e75',
                900: '#164e63'
            },
            inherit: colors.inherit,
            current: colors.current,
            transparent: colors.transparent,
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            indigo: colors.indigo,
            // emerald: colors.emerald,
            violet: colors.violet,
            yellow: colors.yellow,
            red: colors.red,
            purple: '#7C4DFF',
            primary: '#FFFFFF',
            stone: '#253143',
            background: {
                primary: '#FFFFFF',
                secondary: '#253143'
            }
        },
        screens: {
            'xs': '475px',
            '3xl': '1920px',
            ...defaultTheme.screens
        },
        spacing: {
            ...defaultTheme.spacing,
            5: '1.25rem', // 20px
            '7.5': '1.894rem', // 30.3px
            '8.9': '2.227rem', // 35.63px
            '10.48': '2.62rem', // 41.91px
            '20.5': '5.0925rem', // 81.48px
            21: '5.25rem', // 84px
            25: '6.25rem', // 100px
            '70.5': '17.6rem' // 281.6px
        },
        extend: {
            padding: {
                '1/3': '33.33333%',
                '2/3': '66.66667%'
            },
            colors: {
                gray: {
                    600: '#5B6B86',
                    900: '#253143'
                }
            },
            fontSize: {
                'xs': ['0.75rem', '0.75rem'], // 12px / 12px
                'sm': ['0.875rem', '0.9625rem'], // 14px / 15.4px
                'base': ['1rem', '1.5rem'], // 16px / 24px
                'md': ['1.125rem', '1.5rem'], // 18px / 24px
                'md-wide': ['1.125rem', '1.562rem'], // 18px / 25px
                'md-extra-wide': ['1.125rem', '3.757rem'], // 18px / 60.11px
                'lg': ['1.25rem', '5.252rem'], // 20px / 84.03px
                'xl': ['1.5rem', '2rem'], // 24px / 32px
                '2xl': ['1.571rem', '2.23rem'], // 25.14px / 35.69px
                '2xl-wide': ['1.571rem', '5.248rem'], // 25.14px / 83.97px
                '3xl': ['1.875rem', '2.125rem'], // 30px / 34px
                '4xl': ['2.968rem', '3.142rem'], // 47.48px / 50.27px
                '5xl': ['3.125rem', '4.54rem'], // 50px / 72.64px
                '6xl': ['3.625rem', '3.75rem'], // 58px / 60px
                '7xl': ['4rem', '4.375rem'], // 64px / 70px
                'tiny': ['0.875rem', '0.875rem'] // 14px / 14px
            }
        },
        letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0em',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em'
        },
        fontFamily: {
            inter: ['Inter'],
            sans: ['Inter', 'sans-serif'],
            thin: ['Inter-Thin, Inter-thin, Inter, sans-serif'],
            roboto_condensed: ['Roboto Condensed']
        },
        keyframes: {
            fadeInUp: {
                '0%': { opacity: '0', transform: 'translateY(20px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' }
            }
        },
        animation: {
            'fade-in-up': 'fadeInUp 0.8s ease-out forwards'
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@headlessui/tailwindcss')
    ]
}
export default config