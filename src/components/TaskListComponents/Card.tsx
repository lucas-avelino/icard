import React from 'react'
import styled from 'styled-components'

interface ICardProps extends React.HTMLAttributes<HTMLDivElement>{

}


const StyledCard = styled.div`
    background-color: white;
    border-radius: 4px;
    padding: 4px;
    box-shadow: grey 1px 1px 2px 0px;
`

export const Card = (props:ICardProps) => {
    return (
        <StyledCard>
            {props.children}
        </StyledCard>
    )
}
