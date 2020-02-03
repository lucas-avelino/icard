import React from 'react'
import styled from 'styled-components'

const StyledMenuGroup = styled.div`
    display: flex;

`

export const MenuGroup = (props:React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <StyledMenuGroup>
            {props.children}
        </StyledMenuGroup>
    )
}
