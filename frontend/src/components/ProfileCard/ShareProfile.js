import React from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { ReactComponent as IconShare } from './../icons/share.svg'

const ShareProfile = ({profileId}) => {
    
    const copyAndNotify = () => {
        toast.success("Copied link to clipboard!", {
            toastId: profileId
        })
    }

    const sharableUrl = `${process.env.REACT_APP_DOMAIN}?profileId=${profileId}`

    return <CopyToClipboard text={sharableUrl} onCopy={copyAndNotify}>
            <StyledIcon>
                <IconShare/>
            </StyledIcon>
        </CopyToClipboard>
}

const StyledIcon = styled.div`
    width:20px;
    height:20px;
    cursor:pointer;

    > svg {
        width:100%;
        height:100%;
    }

    &:hover {
        opacity:0.8;
    }
`


export default ShareProfile
