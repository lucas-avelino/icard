import * as React from 'react'
import styled from 'styled-components'

interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {

}

const StyledMenu = styled.div<IHeaderProps>`
    width: 100%;
    height: 35px;
    background-color: rgba(50,50,50,0.4);
    /* position: fixed; */
    top: 0px;
    left: 0px;
    padding: 3px;
    display: flex;
    justify-content: space-between;
`

export const Header:React.FC<IHeaderProps> = (props:IHeaderProps) => {
    return (
        <StyledMenu>
            {props.children}
        </StyledMenu>
    )
}