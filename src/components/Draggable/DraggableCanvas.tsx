import React, { ReactNode, ReactNodeArray } from 'react'
import styled from 'styled-components'
import { Draggable } from './Draggable';
import HashMap from './HashMap';

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
    const [fakePosition, setFakePosition] = React.useState(-1);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [onMovementElement, setOnMovementElement] = React.useState(-1);
    const [sequence, setSequence] = React.useState({} as HashMap);
    const [cards, setCards] = React.useState(props.children as ReactNodeArray);
    // console.log(cards);
    React.useEffect(() => {
        const setFromEvent = (e: MouseEvent) => {
            //if (onMovement) {
            setPosition({ x: e.clientX, y: e.clientY });
            //}
        };

        window.addEventListener("mousemove", setFromEvent);

        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    })

    const getPosition = () => {
        setFakePosition(Math.floor(((position.x/2) - 125) / 125)+1)
        return position;
    }

    const release = () => {
        const cardTemp = [...cards];
        const card = cardTemp[onMovementElement];
        
        for (let i = onMovementElement; i <= fakePosition; i++) {
            if(i == fakePosition){
                cardTemp[i] = card
            }else{
                cardTemp[i] =cardTemp[i+1]
            }

        }
        setCards(cardTemp)

        // setSequence({...sequence, [onMovementElement]:fakePosition} as HashMap)
        console.log({ cardTemp,fakePosition });
        setFakePosition(-1)
        setOnMovementElement(-1)
    }
    console.log(onMovementElement)
    let children = (cards).map((e, i, array) => {
        return (<Draggable
            //movementCallback={movement}
            index={i}
            getPosition={getPosition}
            setOnMovementElement={setOnMovementElement}
            isInMovement={i === onMovementElement}
            release={release}
        >
            {e}
        </Draggable>
        )
    })


    if (fakePosition !== -1 && onMovementElement !== -1) {
        children = [...children.slice(0, fakePosition+1), <div>teste</div>, ...children.slice(fakePosition)]
    }
    return (
        <StyledDraggableCanvas grid={[children.length, 1]} {...props}>
            {children}
        </StyledDraggableCanvas>
    )
}
