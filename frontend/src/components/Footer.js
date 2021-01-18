import React from 'react'
import styled from 'styled-components'
import {Container} from './layout/wrappers'
import { theme, device } from '../config/theme'
import { Link } from 'react-router-dom'
import settings from '../config/settings'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return <Wrapper>
        <Inner>
            <div>
                Made with <span role="img" aria-label="love">❤️</span> 
                in <a target="_blank" href="https://goo.gl/maps/ZTEUrCvDWmgqMkv77">Cluj-Napoca</a>, 
                by <strong><a target="_blank" href="https://fortyfive.tech">Fortyfive</a></strong>

                <Copyright>Copyright &copy; {currentYear} {settings.companyName}</Copyright>
            </div>

            <Menu>
                {settings.footerMenuItems.length && 
                    <MenuItems>
                        {settings.footerMenuItems.map(menuItem => {
                            return menuItem.external ? 
                                <a key={menuItem.path} href={menuItem.path} rel="noopener noreferrer" target="_blank">{menuItem.label}</a> :
                                <Link key={menuItem.path} to={menuItem.path}>{menuItem.label}</Link>
                        })}
                    </MenuItems>
                }
                
                <Contact>
                    <span> &bull; </span><span>Get in touch at <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a></span>
                </Contact>
            </Menu>

        </Inner>
    </Wrapper>
}

const Wrapper = styled.div`
    background:${theme.colors.neutral};
    min-height:100px;
    flex-shrink: 0;
    display:flex;
    padding-top: ${theme.spacing._20};
`

const Inner = styled(Container)`
    display:flex;
    line-height: 1.5;
    font-size:${theme.fonts.sizes.normal};
    flex-direction:column-reverse;
    justify-content:center;
    align-items:center;

    @media ${device.laptop} {
        flex-direction:row;
        justify-content:space-between;
    }
`

const Menu = styled.ul`
    display:block;
    padding:0;
    margin:0;
    list-style-type:none;
    text-align:center;
    margin-bottom:${theme.spacing._20};

    @media ${device.laptop} {
        display:flex;
    }
`

const MenuItems = styled.div`
    > * {
        margin:0 ${theme.spacing._5};
    }
`

const Contact = styled.div`
    text-align:center;

    > span:first-child {
        display:none;
    }

    @media ${device.laptop} {
        text-align:right;
        > span:first-child {
            margin:0 ${theme.spacing._10};
            display:inline-block;
        }   
    }
`

const Copyright = styled.div`
    margin:${theme.spacing._20} 0;
    text-align:center;

    @media ${device.laptop} {
        margin:0;
        text-align:left;
    }
`

export default Footer
