import { createGlobalStyle } from 'styled-components'

export const theme = {
    colors: {
        main: '#36185e',
        neutral: '#f1f1f1',
        neutralText: '#757575',
        text: '#373c40',
        foreground: '#b1b1b1',
        light: '#ddd',
        link: '#553385'
    },
    fonts: {
        sizes: {
            small: '0.75rem',
            normal : '0.9rem',
            increased: '1.2rem',
            large: '1.55rem',
            big: '1.875rem',
            extraBig: '3.125rem'
        },
        families: {
            main: 'Roboto'
        }
    },
    spacing: {
        _5: '0.3125rem',
        _10: '0.625rem',
        _15: '0.9375rem',
        _20: '1.25rem',
        _30: '1.875rem',
        _60: '3.75rem'
    }
}

export const GlobalStyle = createGlobalStyle`
    font-family: ${theme.fonts.families.main};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    a {
        color:${theme.colors.link}
    }
`


export const deviceSizes = {
    mobileS: '320',
    mobileM: '375',
    mobileL: '425',
    tablet: '768',
    laptop: '1024',
    laptopL: '1440',
    desktop: '2560'
}

export const device = Object.keys(deviceSizes).reduce((acc, cur) => {
    acc[cur] = `(min-width: ${deviceSizes[cur]}px)`
    return acc
}, {})
