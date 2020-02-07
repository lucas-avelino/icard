import React from 'react'
import styled from 'styled-components'

interface ITaskListContainerProps extends React.HTMLAttributes<HTMLDivElement>{

}

const StyledTaskListContainer = styled.div`
   width: 100%;
`


export const TaskListContainer = (props:ITaskListContainerProps) => {
    return (
        <StyledTaskListContainer>
            {props.children}
        </StyledTaskListContainer>
    )
}
