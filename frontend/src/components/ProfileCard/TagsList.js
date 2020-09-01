import React from 'react'
import styled from 'styled-components'
import { theme } from '../../config/theme'

const TagsList = ({roles}) => {
    return <Wrapper>
        {roles.map(item => 
            <div key={item.role.id}>
                <Tag>{item.role.name}</Tag>
            </div>
        )}        
    </Wrapper>
}

const Wrapper = styled.div`

`

const Tag = styled.div`
    background:${theme.colors.main};
    color:white;
    border-radius:40px;
    padding:5px 8px;
    display:inline-block;
    margin:0 5px 5px 0;
    font-size:${theme.fonts.sizes.small};
`

export default TagsList
