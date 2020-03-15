import React, { useState, useRef } from 'react'
import Coord from '../components/Draggable/Cord';

/*
 * Hook to dragable components
*/
export const useDrag = () => {
    const [isOnMovement, setIsOnMovement] = useState(false);
    const [position, setPosition] = useState({x:-1, y:-1} as Coord);
    const componentRef = useRef({} as HTMLDivElement)

    const setFromEvent = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isOnMovement) {
            setIsOnMovement(true);
            window.addEventListener("mousemove", setFromEvent);
            // console.log(componentRef)
            e.stopPropagation()
        }
    }
    const mouseUpHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isOnMovement) {
            setIsOnMovement(false);
            // console.log("up")
            window.removeEventListener("mousemove", setFromEvent);
            // e.preventDefault();
            e.stopPropagation()
        }
    }

    const componentProps = {
        onMouseDown: mouseDownHandler,
        onMouseUp: mouseUpHandler,
        position,
        isOnMovement,
        ref: componentRef,
        style: (isOnMovement ? {
            top: position.y - 10,
            left: position.x - 10
        } : {})
    };
    console.log(componentProps)
    return {componentProps}
}