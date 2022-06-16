import { useEffect, useState } from "react"
import { ICircle, IEntity, ISize } from "../interfaces"
import * as S from '../styles'

type TargetProps = {
    gameAreaSize: ISize;
    answer: {value: string, isCorrect: boolean};
    targetNumber: number;
    onSetTarget: (circle: ICircle, targetNumber: number) => void;
    isVisible: boolean
}

const TARGET: IEntity = {top: 0, left:300, width:100, height:100}

const calcTarget = (gameAreaSize:ISize, targetNumber: number, onSetTarget?:(circle: ICircle, targetNumber: number) => void)=> {
    const size = Math.floor(gameAreaSize.height/5)
    const top = Math.floor(gameAreaSize.height/5*targetNumber+gameAreaSize.height/25*(targetNumber+1))
    const left = Math.floor(gameAreaSize.width - 4*size)
    if (onSetTarget) {
        onSetTarget({centerTop: top+size/2, centerLeft: left + size/2+ 15, radius:size/2}, targetNumber);
    }
    
    return {top, left, height:size, width:size}
}

const Target = ({gameAreaSize, answer, targetNumber, onSetTarget, isVisible }: TargetProps) => {
    const [target, setTarget] = useState<IEntity>({...TARGET, ...calcTarget(gameAreaSize, targetNumber) });

    useEffect(() => {
        setTarget(target => {
            return {...target, ...calcTarget(gameAreaSize, targetNumber, onSetTarget) }
        })
    }, [gameAreaSize, onSetTarget]);

    return (
        <>
        { isVisible &&
            <S.CircleEntity entity={target} color={'yellow'}>
                <S.Answer><div>{answer.value}</div></S.Answer>
            </S.CircleEntity>
         }
        </>
    )
}

export default Target