import React, { useRef, HtmlHTMLAttributes } from 'react'
import styled from 'styled-components'
import { useDrag } from '../../hooks/useDrag'
import { Draggable } from '../Draggable/Draggable'

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {

}


const StyledCard = styled.div<{
    isOnMovement: boolean
}>`
    background-color: white;
    border-radius: 4px;
    padding: 4px;
    box-shadow: grey 1px 1px 2px 0px;
    position: ${(props) => props.isOnMovement ? 'absolute' : 'relative'};
    height: fit-content;
    cursor: ${(props) => props.isOnMovement ? 'grab' : 'pointer'};
`

export const Card = (props: ICardProps) => {
    const { componentProps } = useDrag()
    
    return (
        <StyledCard
            {...componentProps}
        >
            {props.children}
        </StyledCard>
    )
}
