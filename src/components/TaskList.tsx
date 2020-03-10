
import React from 'react'
import styled from 'styled-components'
import { TaskListHeader } from "./TaskListComponents";
import { TaskListContainer } from './TaskListComponents/TaskListContainer';
import { Card } from './TaskListComponents/Card';
// import Draggable from 'react-draggable';

interface IPropsTaskList extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

const StyledTaskList = styled.div<{
    draging?: boolean
}>`
    background-color: #ddd;
    width: 100%;
    min-height: 100px;
    // margin: 10px;
    border-radius: 4px;
    padding: 6px;
    
    ${(props) => props.draging?' transform: rotate(100deg);':''}

    &.react-draggable-dragged{
        transform: rotate(100deg);
    }
`;





export const TaskList: React.FC<IPropsTaskList> = (props: IPropsTaskList) => {

    return (
        // <Draggable
        //     scale={1}
        //     onDrag={onDrag}
        // >
            <StyledTaskList>
                <TaskListHeader title={props.title}></TaskListHeader>
                <TaskListContainer>
                    <Card>
                        Teste
                    </Card>
                </TaskListContainer>
            </StyledTaskList>
        // </Draggable>
    )
}
