import * as React from 'react';
import styled from 'styled-components';

interface IDraggableProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    movementCallback: (p: {
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
}

const StyledDraggable = styled.div<{
    isInMovement: boolean,
}>`
    position: ${(props) => props.isInMovement ? 'absolute' : 'relative'};

`


export const Draggable = (props: IDraggableProps) => {
    const [onMovement, setOnMovement] = React.useState(props && props.state && props.state.onMovement || false);
    const [position, setPosition] = React.useState(props && props.state && props.state.position || { x: 0, y: 0 });
    const [clickPosition, setClickPosition] = React.useState(props && props.state && props.state.clickPosition || { x: 0, y: 0 });
    const [realPosition, setRealPosition] = React.useState(props && props.state && props.state.realPosition || { x: 0, y: 0 });

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!onMovement) {
            setOnMovement(true);
            setClickPosition({ x: e.clientX, y: e.clientY })
        }
    }

    const onMouseUp = (e: React.MouseEvent) => {
        console.log("release", realPosition)
        setOnMovement(false);
        const boundingClientRect = (e.target as HTMLDivElement).getBoundingClientRect()
        setRealPosition(
            {
                x: realPosition.x + (position.x - clickPosition.x),
                y: realPosition.y + (position.y - clickPosition.y)
            }
        );
        setPosition({
            x: 0,
            y: 0
        });
        setClickPosition({
            x: 0,
            y: 0
        })
    }
    console.log({ realPosition })


    React.useEffect(() => {
        const setFromEvent = (e: MouseEvent) => {
            if (onMovement) {
                setPosition({ x: e.clientX, y: e.clientY });
                props.movementCallback({
                    x: e.clientX,
                    y: e.clientY,
                    index: props.index,
                    state: {
                        position: position,
                        clickPosition: clickPosition,
                        realPosition: realPosition,
                        onMovement: onMovement
                    }
                })
            }
        };

        window.addEventListener("mousemove", setFromEvent);

        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    })

    console.log(realPosition.x + (position.x - clickPosition.x), realPosition.y + (position.y - clickPosition.y))

    return (<StyledDraggable
        style={onMovement ? {
            top: position.y - 10,
            left: position.x - 10,
        } : {}}
        isInMovement={onMovement}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
    >
        {props.children}
    </StyledDraggable>)
}