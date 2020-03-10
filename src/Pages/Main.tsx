import * as React from 'react'

import img from '../assets/PapelDeParede1.jpg'
import { BackgroundContainer } from '../components/BackgroundContainer';
import { Header } from '../components/Header';
import { MenuButton, MenuGroup } from '../components/HeaderComponents';
import { FaHome, FaTrello, FaPlus } from 'react-icons/fa';
import { MdNotificationsNone, MdInfoOutline } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import styled from 'styled-components';
import { TaskList } from '../components/TaskList';
import { DraggableCanvas } from '../components/Draggable/DraggableCanvas';
import { Draggable } from '../components/Draggable/Draggable';


const StyledFaHome = styled(FaHome)`
    width: 23px;
    height: 100%;
    color: white;
`
const StyledFaTrello = styled(FaTrello)`
    width: 16px;
    height: 100%;
    color: white;
`

const StyledFiPlus = styled(FiPlus)`
    width: 23px;
    height: 100%;
    color: white;
`

const StyledFaInfoCircle = styled(MdInfoOutline)`
    width: 23px;
    height: 100%;
    color: white;
`;

const StyledMdNotificationsNone = styled(MdNotificationsNone)`
    width: 23px;
    height: 100%;
    color: white;
`;

const StyledMenuButton = styled(MenuButton)`
    background-color: 
    !important;
`;

const StyledH2 = styled.h2`
    font-family: 'Segoe Script';
    font-style: italic;
    color: white;
    line-height: 30px;
    display: inline;
    margin-left: 4px;
`

const StyledContainer = styled.div`
    display: flex;
`

// const canvas = DraggableCanvas(MenuButton)

export default (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <BackgroundContainer background={img} style={{ width: '100vw', height: '100vh' }}>
            <Header>
                <MenuGroup>
                    <MenuButton> <StyledFaHome /> </MenuButton>
                    <MenuButton> <StyledFaTrello /> <span>Quadros</span> </MenuButton>

                </MenuGroup>
                <MenuGroup>
                    <StyledFaTrello /><StyledH2>ICard</StyledH2>
                </MenuGroup>
                <MenuGroup>
                    <MenuButton><StyledFiPlus /></MenuButton>
                    <MenuButton><StyledFaInfoCircle /></MenuButton>
                    <StyledMenuButton><StyledMdNotificationsNone /></StyledMenuButton>
                </MenuGroup>
            </Header>

            <DraggableCanvas>
                <TaskList title="Backlog" key={1}>

                </TaskList>
                <TaskList title="Active" key={2}>

                </TaskList>
                <TaskList title="Closed" key={3}>

                </TaskList>
            </DraggableCanvas>
        </BackgroundContainer>
    )
};