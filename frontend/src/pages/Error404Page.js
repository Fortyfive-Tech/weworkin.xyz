import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Error404Page = () => {
    return <Wrapper>
        <h1>404 - page not found</h1>
        <Link to="/">Return Home</Link>
    </Wrapper>
}

const Wrapper = styled.div`
    margin-bottom: 3rem;
    text-align:center;

    h1 {
        font-weight:normal;
    }
`

export default Error404Page
