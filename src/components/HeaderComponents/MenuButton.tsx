import * as  React from 'react'
import styled from 'styled-components'

interface IMenuButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {

}

const StyledMenuButton = styled.button<IMenuButtonProps>`
    border: none;
    border-radius: 3px;
    background-color: rgba(255,255,255,0.4);
    margin-right: 3px;
    height: 100%;
    padding: 3px;
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;

    & > span{
        margin-left: 4px;
        font-weight: bold;
    }

    &:hover{
        filter: brightness(80%)
    }
`

export const MenuButton:React.FC<IMenuButtonProps> = (props: IMenuButtonProps) => {
    return (
        <StyledMenuButton>
            {props.children}
        </StyledMenuButton>
    )
}
