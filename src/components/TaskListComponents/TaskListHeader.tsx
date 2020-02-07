
import React from 'react'
import styled from 'styled-components'
import {MdMoreHoriz} from 'react-icons/md'
interface ITaskListHeaderProps extends React.HTMLAttributes<HTMLDivElement>{
    title: string,
}


const StyledTaskListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
    margin: 4px;
    align-items: center;
    font-weight: 500;
    color: #02025f;
`

const StyledMdMoreHoriz = styled(MdMoreHoriz)`
    color: #02025f;
`

export const TaskListHeader = (props:ITaskListHeaderProps) => {
    return (
        <StyledTaskListHeader>
            {props.title}
            <StyledMdMoreHoriz/>
        </StyledTaskListHeader>
    )
}
