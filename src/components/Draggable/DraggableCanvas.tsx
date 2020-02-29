import React, { ReactNode, ReactNodeArray } from 'react'
import styled from 'styled-components'
import { Draggable } from './Draggable';
import HashMap from './HashMap';
import { FiCornerDownLeft } from 'react-icons/fi';

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

const StyledFakePositionHolder = styled.div<{
    height: number;
}>`
    height: ${(props) => props.height}px;
    width: 100%;
    background: rgba(255,255,255,0.5);
    border-radius: 4px;
`;

export const DraggableCanvas: React.FC<IDraggableCanvasProps> = (props: IDraggableCanvasProps) => {
    const [fakePosition, setFakePosition] = React.useState(-1);
    const [heightOfSelectedElement, setHeightOfSelectedElement] = React.useState(-1);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [onMovementElement, setOnMovementElement] = React.useState(-1);
    const [cards, setCards] = React.useState(props.children as ReactNodeArray);
    React.useEffect(() => {
        const setFromEvent = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", setFromEvent);

        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    })

    const getPosition = () => {
        //Todo: Fix the relative position function (problems with precision with big values of position)
        setFakePosition(() => {//plot function in desmos to understand the function behavior 
            const temp = Math.floor(((position.x / 2) - 130) / 130) + 1;
            return temp < 0 ? temp + 1 : temp
        })
        return position;
    }

    const release = () => {
        const cardTemp = [...cards];
        if (onMovementElement < fakePosition) {
            for (let i = onMovementElement; i < fakePosition; i++) {
                const aux = cardTemp[i];
                cardTemp[i] = cardTemp[i + 1];
                cardTemp[i + 1] = aux;
            }
        } else if (onMovementElement > fakePosition) {
            for (let i = onMovementElement; i > fakePosition; i--) {
                const aux = cardTemp[i];
                cardTemp[i] = cardTemp[i - 1];
                cardTemp[i - 1] = aux;
            }
        }
        setCards(cardTemp)
        setFakePosition(-1)
        setOnMovementElement(-1)
    }
    
    const activeMovement = (index: number, size: number) => {
        setOnMovementElement(index);
        setHeightOfSelectedElement(size);
    }

    let children = (cards).map((e, i, array) => {
        return (<Draggable
            index={i}
            getPosition={getPosition}
            activeMovement={activeMovement}
            isInMovement={i === onMovementElement}
            release={release}
        >
            {e}
        </Draggable>
        )
    })


    if (fakePosition !== -1 && onMovementElement !== -1) {
        const card = children[onMovementElement];
        children = children.filter((obj, i) => i != onMovementElement)
        children.splice(fakePosition, 0, <StyledFakePositionHolder height={heightOfSelectedElement}/>);
        children.push(card);
    }
    return (
        <StyledDraggableCanvas grid={[children.length, 1]} {...props}>
            {children}
        </StyledDraggableCanvas>
    )
}