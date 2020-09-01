import React from 'react'
import CookieConsent from 'react-cookie-consent'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme, device } from '../config/theme'

const ConsentPopup = () => {
    return <CookieConsent
        onAccept={() => {
            window.location.reload()
        }}
        acceptOnScrollPercentage={50}
        location="bottom"
        sameSite="strict"
        buttonText="I Agree"
        cookieName={process.env.REACT_APP_CONSENT_COOKIE_NAME}
        style={{ 
            background: '#000', 
            alignItems: 'center'
        }}
        buttonStyle={{
            color: 'black', 
            fontSize: '20px' }}
        expires={365}
    >
        <Content>
            <p>This site uses cookies to improve the user experience, which you can accept
            by clicking "I Agree". For more information, read our <Link to="/privacy">Data Privacy Policy</Link>.</p>
        </Content>
  </CookieConsent>
}

const Content = styled.div`
    font-size:${theme.fonts.sizes.normal};

    p {
        display:inline-block;
        margin:0;
    }
    @media ${device.laptop} {
        p {
            width:80%;
        }
    }
    


    a {
        color:white;
    }
`

export default ConsentPopup
