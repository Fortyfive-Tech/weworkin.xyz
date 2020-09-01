import React from 'react'
import styled from 'styled-components'
import { theme } from '../../config/theme'

export const Container = styled.div`
    width:100%;
    max-width:1200px;
    margin:0 auto;
    padding:0 ${theme.spacing._10};
`

// Needed for "sticky-footer"
const ContentWrapper = styled.div`
    display: block;
    flex-direction: column;   
    min-height:100vh;
`

const Content = styled.div`
    flex: 1 0 auto;
`

export const LayoutWrapper = ({children}) => {
    return <ContentWrapper>
        <Content>
            <Container>
                {children}
            </Container>
        </Content>
    </ContentWrapper>
}