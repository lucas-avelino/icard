import * as React from 'react';
import styled from 'styled-components';
import Coord from './Cord';
import { useDrag } from '../../hooks/useDrag';

interface IDraggableProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    state?: {
        position: { x: number, y: number },
        clickPosition: { x: number, y: number },
        realPosition: { x: number, y: number },
        onMovement: boolean
    };
    index: number;
    isInMovement: boolean,
    activeMovement: any,
    release: () => any,
    getPosition: () => Coord;
}

const StyledDraggable = styled.div<{
    isInMovement: boolean,
}>`
    position: ${(props) => props.isInMovement ? 'absolute' : 'relative'};
    height: fit-content;
    cursor: ${(props) => props.isInMovement ? 'grab' : 'pointer'};
`


export const Draggable = React.memo((props: IDraggableProps) => {
    const {onMouseUp,onMouseDown} = useDrag({...props, children: props.children, ...props.state});

    return (<StyledDraggable
        style={props.isInMovement ? {
            top: props.getPosition().y - 10,
            left: props.getPosition().x - 10,
        } : {}}
        isInMovement={props.isInMovement}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        className={"StyledDraggable"}
    >
        {props.children}
    </StyledDraggable>)
})