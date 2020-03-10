import React, { ReactNodeArray } from 'react'
import styled from 'styled-components';
import { Draggable } from '../components/Draggable/Draggable';

const StyledFakePositionHolder = styled.div<{
    height?: number;
}>`
    height: ${(props) => props.height}px;
    width: 100%;
    background: rgba(255,255,255,0.5);
    border-radius: 4px;
`;


export const useDragCanvas = ({children}:any) => {
    const [fakePosition, setFakePosition] = React.useState(-1);
    const [heightOfSelectedElement, setHeightOfSelectedElement] = React.useState(-1);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [onMovementElement, setOnMovementElement] = React.useState(-1);
    const [cards, setCards] = React.useState(children as ReactNodeArray);
    console.log(children)
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

    let childList = cards && (cards).map((e, i, array) => {
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
        const card = childList[onMovementElement];
        childList = childList.filter((obj, i) => i != onMovementElement)
        childList.splice(fakePosition, 0, <StyledFakePositionHolder height={heightOfSelectedElement}/>);
        childList.push(card);
    }

    return {childList}
}