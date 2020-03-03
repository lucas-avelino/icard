import * as React from 'react';
import styled from 'styled-components';
import Coord from './Cord';

interface IDraggableProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    movementCallback?: (p: {
        x: number,
        y: number,
        index: number,
        state: {
            position: { x: number, y: number },
            clickPosition: { x: number, y: number },
            realPosition: { x: number, y: number },
            onMovement: boolean
        }
    }) => void;
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
    
    const [clickPosition, setClickPosition] = React.useState(props && props.state && props.state.clickPosition || { x: 0, y: 0 });
    const [realPosition, setRealPosition] = React.useState(props && props.state && props.state.realPosition || { x: 0, y: 0 });

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!props.isInMovement) {
            const getFirstParent:(element :HTMLElement) => HTMLDivElement = (element :HTMLElement) => {
                if(element.classList.contains("StyledDraggable")){
                    return element as HTMLDivElement;
                }else{
                    return getFirstParent(element.parentElement as HTMLElement) as HTMLDivElement; 
                }
            }
            
            props.activeMovement(props.index, getFirstParent((e.target as HTMLElement)).getBoundingClientRect().height);
            setClickPosition({ x: e.clientX, y: e.clientY })
        }
    }

    const onMouseUp = (e: React.MouseEvent) => {
        // console.log("release", realPosition)
        props.release()
        // const boundingClientRect = (e.target as HTMLDivElement).getBoundingClientRect()
        setRealPosition(
            {
                x: realPosition.x + (props.getPosition().x - clickPosition.x),
                y: realPosition.y + (props.getPosition().y - clickPosition.y)
            }
        );
        setClickPosition({
            x: 0,
            y: 0
        })
    }
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