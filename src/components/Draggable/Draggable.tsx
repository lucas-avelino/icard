import * as React from 'react';
import styled from 'styled-components';
import Coord from './Cord';
import { useDrag } from '../../hooks/useDrag';

interface IDraggableProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    
}

const StyledDraggable = styled.div<{
    isOnMovement: boolean,
}>`
    position: ${(props) => props.isOnMovement ? 'absolute' : 'relative'};
    height: fit-content;
    cursor: ${(props) => props.isOnMovement ? 'grab' : 'pointer'};
`


export const Draggable = React.memo((props: IDraggableProps) => {
    const { componentProps } = useDrag();

    return (<StyledDraggable
        style={componentProps.isOnMovement ? {
            top: componentProps.position.y - 10,
            left: componentProps.position.x - 10,
        } : {}}
        {...componentProps}
        className={"StyledDraggable"}
    >
        {props.children}
    </StyledDraggable>)
})