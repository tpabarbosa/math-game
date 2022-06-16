import { useEffect, useState } from "react"
import { IEntity, ISize } from "../interfaces"
import * as S from '../styles'

type MonsterProps = {
    gameAreaSize: ISize;
    question: string;
    lives: number
}

const MONSTER: IEntity = {top: 200, left:500, width:100, height:100}

const calcMonster = (gameAreaSize:ISize)=> {
    const size = Math.floor(gameAreaSize.height/5)
    const top = Math.floor(gameAreaSize.height/5)
    const left = Math.floor(gameAreaSize.width - 2.3*size)
    return {top, left, height:3*size, width:1.5*size}
}

const Monster = ({gameAreaSize, question, lives}: MonsterProps) => {
    const [monster, setMonster] = useState<IEntity>({...MONSTER, ...calcMonster(gameAreaSize) });

    useEffect(() => {
        setMonster(monster => {
            return {...monster, ...calcMonster(gameAreaSize) }
        })
    }, [gameAreaSize])

    return (
        <>
            <S.Entity entity={monster} color={'blue'}>
                <S.Question><div>{question}</div></S.Question>
            </S.Entity>
        </>
        )
}

export default Monster