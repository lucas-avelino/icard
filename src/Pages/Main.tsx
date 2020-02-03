import * as React from 'react'
import { BackgroundContainer } from '../components/BackgroundContainer';
import img from '../assets/PapelDeParede1.jpg' 

export default (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <BackgroundContainer background={img} style={{width:'100vw',height:'100vh'}}>

        </BackgroundContainer>
    )
};