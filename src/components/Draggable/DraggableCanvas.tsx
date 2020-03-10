import React, { ReactNode, ReactNodeArray } from 'react'
import styled from 'styled-components'
import { Draggable } from './Draggable';
import HashMap from './HashMap';
import { FiCornerDownLeft } from 'react-icons/fi';
import { useDragCanvas } from '../../hooks/useDragCanvas';

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
    const {childList} = useDragCanvas({...props})
    console.log(props.children)
    return (
        <StyledDraggableCanvas grid={[(childList && childList.length) || 1 , 1]} {...props}>
            {childList && childList}
        </StyledDraggableCanvas>
    )
}
