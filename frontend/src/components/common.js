import styled from 'styled-components'
import {theme} from '../config/theme'

export const Button = styled.button`
    background:${({isInverted}) => isInverted ? 'white' : theme.colors.link};
    color:${({isInverted}) => !isInverted ? 'white' : theme.colors.link};
    font-size:${theme.fonts.sizes.increased};
    font-weight:bold;
    padding:${theme.spacing._15};
    border:none;
    text-decoration:none;
    cursor:pointer;
    transition:all 0.12s ease-in-out;

    &:hover {
        background:${theme.colors.main};
        color:white;
    }
`

export const CheckBox = styled.label`
    display:flex;
    color:#424242;
    color:${({hasError}) => hasError ? 'red' : '#424242'};
    cursor:pointer;

    &:hover {
        color:black;
    }

    input[type="checkbox"] {
        flex:0 0 20px;
        border-radius: 4px;
        cursor:pointer;
        border:1px solid hsl(0,0%,80%);
        color:hsl(0,0%,20%);
        font-size:16px;
        margin-right:10px;
        width:20px;
        height:20px;
    }
`