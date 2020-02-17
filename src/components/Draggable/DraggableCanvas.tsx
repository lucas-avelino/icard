import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Draggable } from './Draggable';

interface IDraggableCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    grid?: [number, number]
}

const StyledDraggableCanvas = styled.div<{
    grid?: [number, number]
}>`
    ${(props) => {
        if (props.grid) {
            return `
                display: grid;
                grid-template-columns: repeat(${props.grid[0]}, 250px);
                grid-template-rows: repeat(${props.grid[1]}, 250px);
                grid-column-gap: 20px;
            `
        }
    }}
    width: 100fr;
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    margin: 10px;
`;

export const DraggableCanvas: React.FC<IDraggableCanvasProps> = (props: IDraggableCanvasProps) => {
    const a = "";
    const [fakePosition, setFakePosition] = React.useState(-1);

    const movement = (p: {
        x: number,
        y: number,
        index: number,
        state: {
            position: { x: number, y: number },
            clickPosition: { x: number, y: number },
            realPosition: { x: number, y: number },
            onMovement: boolean
        }
    }) => {
        setFakePosition(Math.floor(p.x / 250))
    };

    let children = (props.children as Array<ReactNode>).map((e, i, array) => {
        return (<Draggable
            movementCallback={movement}
            index={i}
        >
            {e}
        </Draggable>
        )
    })
    if (fakePosition != -1)
        children = [...children.slice(0, fakePosition), <div>teste</div>, ...children.slice(fakePosition)]
    return (
        <StyledDraggableCanvas grid={[children.length, 1]} {...props}>
            {children}
        </StyledDraggableCanvas>
    )
}
