import * as React from 'react'
import styled from 'styled-components';

interface IBackgroundContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    background?: string,
}

const StyledDiv = styled.div<IBackgroundContainerProps>`
    background-image: url(${(props) => props.background});
    background-size: cover;
    overflow: hidden;
`

export const BackgroundContainer: React.FC<IBackgroundContainerProps> = (props:IBackgroundContainerProps) => {

    return (
        <StyledDiv {...props}>
            {props.children}
        </StyledDiv>
    )
}