import React from 'react'
import styled from 'styled-components'
import { theme } from '../config/theme'
import parse from 'html-react-parser'
import settings from '../config/settings.json'

const Hero = () => {
    return <Wrapper>
        <h1>{parse(settings.headline)}</h1>
        <h2>{parse(settings.description)}</h2>
    </Wrapper>
}

const Wrapper = styled.div`
    color:white;
    padding-top:${theme.spacing._60};

    h1 {
        font-size: ${theme.fonts.sizes.extraBig};
        line-height:3.5625rem;
        font-weight:normal;
        margin:0;
    }

    h1 em {
        font-style: normal;
        font-weight: bold;
    }

    h2 {
        font-weight: normal;
        line-height:2.1875rem;
        font-size: 1.75rem;
        margin: ${theme.spacing._15} 0 0;
    }

`

export default Hero
