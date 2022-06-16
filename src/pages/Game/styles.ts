import styled  from "styled-components";
import { IEntity, IPosition, ISize } from "./interfaces";

type ContainerProps = {
    size: ISize
}

export const Container = styled.div<ContainerProps>`
    background-color: white;
    margin: 0 auto;
    width: 90%;
    min-height: ${props => props.size.height}px;
`

export const Bar = styled.div<ContainerProps>`
    position: relative;
    width: ${props => props.size.width}px;
    margin: 0 auto;
    height: ${props => props.size.height/5.5}px;
    background-color: pink;
    
`

export const GameArea = styled.div<ContainerProps>`
    position: absolute;
    width: ${props => props.size.width}px;
    height: ${props => props.size.height}px;
    border: 1px solid black;
    top: 15%;
`

type Props = {
    entity: IEntity;
    color?: string;
}


export const Entity = styled.div.attrs<Props>(props => ({
    style: {
        top: `${props.entity.top}px`,
        left: `${props.entity.left}px`,
    },
    }))<Props>`
    position: absolute;
    background-color: ${props => props.color};
    width: ${props => props.entity.width}px;
    height: ${props => props.entity.height}px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    flex-wrap:nowrap;
`

export const CircleEntity = styled.div.attrs<Props>(props => ({
    style: {
        top: `${props.entity.top}px`,
        left: `${props.entity.left}px`,
    },
    }))<Props>`
    position: absolute;
    border-radius: 100%;
    background-color: ${props => props.color};
    width: ${props => props.entity.width}px;
    height: ${props => props.entity.height}px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Question = styled.div`
    width: 130%;
    height: 40%;
    font-size: 20px;
    background-color: white;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 1;
    border: 1px solid black;

    &::after {
        content: '';
        flex: 0 0 12px; 
    }

    div{
        width: 100%;
        text-align: center;
    }
`

export const Answer = styled.div`
    width: 100%;
    height: 100%;
    font-size: 24px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 1;

    div{
        width: 100%;
        text-align: center;
    }
`

type LivesMeterProps = {
    position: 'start' | 'end'
    gameAreaSize: ISize
    lives: number
}

export const Lives = styled.div`
    margiN: 0 20px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const LivesMeter = styled.div<LivesMeterProps>`
    background-color: black;
    width: 25%;
    height: 40px;
    border: 1px solid green;
    border-radius: 15px;
    overflow: hidden;

    div { 
        width: calc(100% * ${props => (props.lives/10)});
        background-color: green;
        height: 100%;
        transition: all 0.5s ease-in-out;
        text-align: center;
    }
`