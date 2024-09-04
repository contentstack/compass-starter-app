// const colors = require('tailwindcss/colors')
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
            primary: {
                normal: '#6c5ce7',
                focus: '#5C51C1',
                hover: '#4b459b'
            },
            secondary: {
                normal: '#E85646',
                focus: '#D23F2F',
                hover: '#BB2817'
            },
            tertiary: {
                normal: colors.gray[500],
                focus: colors.gray[700],
                hover: colors.gray[900]
            },
            background: {
                primary: '#ffffff',
                secondary: '#F5F5F5'
            }
        },
        screens: {
            'xs': '475px',
            ...defaultTheme.screens
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
            }

            //   backgroundImage: {
            //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            //     'gradient-conic':
            //       'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            //   },
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
            montserrat: ['Montserrat', 'sans-serif']
        // semiBold: ['Inter-SemiBold,Inter, sans-serif'],
        // bold: ['Inter-Bold,Inter-SemiBold,Inter, sans-serif'],
        // extraBold: ['Inter-ExtraBold, Inter-Bold,Inter-SemiBold,Inter, sans-serif']
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@headlessui/tailwindcss')
    ]
}
export default config