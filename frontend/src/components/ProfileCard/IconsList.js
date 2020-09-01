import React, { Fragment } from 'react'
import styled from 'styled-components'

import { ReactComponent as IconLocation } from './../icons/pin.svg'
import { ReactComponent as IconRelocation } from './../icons/home-run.svg'
import { ReactComponent as IconLinkedIn } from './../icons/linkedin.svg'
import { ReactComponent as IconResume } from './../icons/curriculum.svg'
import { ReactComponent as IconLink } from './../icons/url.svg'

import { theme } from '../../config/theme'

// Map icons as components, in order to be used dynamically, by key
const iconsMap = {
    location: IconLocation,
    relocation: IconRelocation,
    linkedin: IconLinkedIn,
    resume: IconResume,
    link: IconLink
}

export const IconItem = ({icon, label, content, hasHref}) => {
    if(!content) {
        return null
    }

    const IconComponent = iconsMap[icon]

    // Have a separate component, in order to keep DRY while wrapping in the case when href is available
    const InnerContent = <Fragment>
        <StyledIcon>
            <IconComponent/>
        </StyledIcon>
        <span>{label ? label : content}</span>
    </Fragment>

    return <ItemWrapper>
        {hasHref ? 
        <a href={content} target="_blank" rel="noopener noreferrer">{InnerContent}</a> : 
        InnerContent}
    </ItemWrapper>
}

const ItemWrapper = styled.li`
    display:flex;
    align-items:center;
    font-size:${theme.fonts.sizes.normal};

    > a {
        color:black;
        display:flex;
        align-items:center;
        text-decoration:none;

        &:hover {
            opacity:0.8;
        }
    }
`

const StyledIcon = styled.div`
    width:20px;
    height:20px;
    margin-right:${theme.spacing._10};
    display:inline-block;

    > svg {
        width:100%;
        height:100%;
    }
`

export const IconsList = styled.ul`
    margin:0;
    padding:0;
    list-style-type:none;

    ${ItemWrapper} {
        margin:${theme.spacing._15} 0;
    }
        
    
`