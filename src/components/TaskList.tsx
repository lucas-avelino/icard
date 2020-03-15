
import React from 'react'
import styled from 'styled-components'
import { TaskListHeader } from "./TaskListComponents";
import { TaskListContainer } from './TaskListComponents/TaskListContainer';
import { Card } from './TaskListComponents/Card';
import { Draggable } from './Draggable/Draggable';
import { useDrag } from '../hooks/useDrag';
// import Draggable from 'react-draggable';

interface IPropsTaskList extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

const StyledTaskList = styled.div<{
    draging?: boolean
}>`
    background-color: #ddd;
    width: 250px;
    min-height: 100px;
    // margin: 10px;
    border-radius: 4px;
    padding: 6px;
    position: absolute;
    ${(props) => props.draging?' transform: rotate(5deg);':''}
`;





export const TaskList: React.FC<IPropsTaskList> = (props: IPropsTaskList) => {
    const {componentProps} = useDrag();
    return (
            <StyledTaskList
                {...componentProps}
                draging={componentProps.isOnMovement}
            >
                <TaskListHeader title={props.title}></TaskListHeader>
                <TaskListContainer>
                    <Card>
                        Teste
                    </Card>
                </TaskListContainer>
            </StyledTaskList>
        
    )
}
