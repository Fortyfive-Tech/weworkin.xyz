import React, { Fragment } from 'react'
import styled from 'styled-components'
import ReactGA from 'react-ga'
import { Link, useLocation } from 'react-router-dom'
import { theme, device } from '../../config/theme'
import { Container } from '../layout/wrappers'
import backgroundSVG from './background-clouds.svg'
import Hero from '../Hero'
import {Button} from '../../components/common'
import settings from '../../config/settings.json'

const Header = () => {
    const currentRoute = useLocation()
    return <Wrapper>
        <Inner>
            <Top>
                <Logo>
                    <Link to="/">
                    {settings.logoPath &&     
                        <img src={settings.logoPath} alt={settings.companyName}/>
                    }

                    {!settings.logoPath && 
                        <strong>{settings.companyName}</strong>
                    } 
                    </Link>
                </Logo>

                {currentRoute.pathname !== '/register' &&
                    <CTA>
                        <span>Do you want to <br/> be featured here?</span>
                        <Link
                            to="/register"
                            onClick={() => {
                                ReactGA.event({
                                    category: 'CTA',
                                    action: 'header_registration'
                                })
                        }}>
                            <Button renderAs="a" isInverted>Register Now</Button>
                        </Link>
                    </CTA>
                }
            </Top>
            
            
            {currentRoute.pathname === '/' && 
                <Fragment>
                    <Hero/>

                    <MobileCTA>
                        <Link
                            to="/register"
                            onClick={() => {
                                ReactGA.event({
                                    category: 'CTA',
                                    action: 'mobile_hero_registration'
                                })
                        }}>
                            <Button renderAs="a" isInverted>Register Now</Button>
                        </Link>
                    </MobileCTA>
                </Fragment>
            }
        </Inner>
    </Wrapper>
}


const Wrapper = styled.div`
    position:relative;
    width:100%;
    background:url(${backgroundSVG});
    background-size:cover;
    background-position:top center;
    display:flex;
`

const Inner = styled(Container)`
    position:relative;
    padding-top:${theme.spacing._30};
    padding-bottom:${theme.spacing._30};

    @media ${device.laptop} {
        padding-top:${theme.spacing._60};
        padding-bottom:${theme.spacing._60};
    }
`

const Top = styled.div`
    display:flex;
    justify-content:space-between;
`

const MobileCTA = styled.div`
    padding-top:30px;
    display:block;

    @media ${device.laptop} {
        display:none;
    }
`

const CTA = styled(MobileCTA)`
    display:none;

    @media ${device.laptop} {
        display:flex;
        align-items:center;
        padding-top:0;

        span {
            color:white;
            font-size:${theme.fonts.sizes.normal};
            text-align:left;
            line-height: 1.47;
            padding-right:10px;
        }
    }
`


const Logo = styled.div`
    width:150px;
    height:auto;

    img {
        display:block;
    }

    a {
        font-size:${theme.fonts.sizes.big};
        color:white;
        text-decoration:none;
    }
    
`

export default Header
