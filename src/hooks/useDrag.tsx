import React from 'react'
export const useDrag = ({
    isInMovement,
    activeMovement,
    index,
    release
}:any) => {
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isInMovement) {
            const getFirstParent: (element: HTMLElement) => HTMLDivElement = (element: HTMLElement) => {
                if (element.classList.contains("StyledDraggable")) {
                    return element as HTMLDivElement;
                } else {
                    return getFirstParent(element.parentElement as HTMLElement) as HTMLDivElement;
                }
            }
            activeMovement(index, getFirstParent((e.target as HTMLElement)).getBoundingClientRect().height);
        }
    }

    const onMouseUp = release;
    return {onMouseUp, onMouseDown}
}