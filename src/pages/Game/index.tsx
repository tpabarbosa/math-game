import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ICircle, IEntity, ISize } from "./interfaces";
import LiveMeter from "./LiveMeter";
import Monster from "./Monster";
import Player from "./Player";
import * as S from './styles'
import Target from "./Target";

const question = '2 + 1 = ?'
const answers = [
    {value: '1', isCorrect: false},
    {value: '2', isCorrect: false},
    {value: '3', isCorrect: true},
    {value: '4', isCorrect: false},
]

const INITIAL_TARGETS = [
    {centerTop: 0, centerLeft: 0, radius:0},
    {centerTop: 0, centerLeft: 0, radius:0},
    {centerTop: 0, centerLeft: 0, radius:0},
    {centerTop: 0, centerLeft: 0, radius:0},
]

const checkCollision = (circle: ICircle, rect: IEntity) => {
    const distX = Math.abs(circle.centerLeft - rect.left - rect.width/2);
    const distY = Math.abs(circle.centerTop - rect.top - rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    // also test for corner collisions
    const dx=distX-rect.width/2;
    const dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius));
}

const Game = () => {
    const { worldId, levelId } = useParams();

    const gameAreaRef = useRef<HTMLDivElement>(null);
    const [gameAreaSize, setGameAreaSize] = useState<ISize>()
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const targets = useRef<ICircle[]>(INITIAL_TARGETS)
    const [isTargetVisible, setIsTargetVisible] = useState<boolean[]>([true, true, true, true])
    const [playerLives, setPlayerLives] = useState(10)
    const [monsterLives, setMonsterLives] = useState(10)

    const handleSetDimensions = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }

    const handleSetTarget = (circle: ICircle, targetNumber:number) => {
        targets.current[targetNumber] = circle
    }

    const handleCheckBulletCollision = (bullet: IEntity) => {
        for (let target of targets.current) {
            const index = targets.current.indexOf(target)
            if (isTargetVisible[index] === true) {
                const collided = checkCollision(target, bullet)
                if (collided) {
                    
                    if (answers[index].isCorrect) {
                        // monster loses life
                        // goto next question
                        if  (monsterLives===1) {
                            // player wins level
                        }

                        if (monsterLives > 1) {
                            setMonsterLives(lives => lives - 1)
                        } 
                        
                    } else {
                        // player loses life
                        if  (playerLives===1) {
                            // player wins level
                        }

                        if (playerLives > 1) {
                            setPlayerLives(lives => lives - 1)
                        } 
                    }
                    setIsTargetVisible(targets => {
                        targets[index] = false
                        return [...targets]
                    })
                    return true   
                }
            }
            
        }
        return false
    }

    useEffect(() => {
        handleSetDimensions()
    },[])

    useEffect(() => {
        if (width && height) {
            setGameAreaSize({width: width*0.9, height: height*0.85})
        }
    }, [width, height])

    useEffect(() => {
        window.addEventListener('resize', handleSetDimensions)

        return () => window.removeEventListener('resize', handleSetDimensions)
    },[])

    return (
        <S.Container size={{width, height}}>
            { gameAreaSize && 
            <>
            <S.Bar size={gameAreaSize}>
                <S.Lives>
                    <LiveMeter 
                        gameAreaSize={gameAreaSize}
                        position={'start'} 
                        lives={playerLives}/>
                    <LiveMeter 
                        gameAreaSize={gameAreaSize}
                        position={'end'} 
                        lives={monsterLives}/>
                </S.Lives>
            </S.Bar>
            
            <S.GameArea ref={gameAreaRef} size={gameAreaSize}>
                <>
                
                { answers.map((answer, index) => 
                    <Target 
                        key={index}
                        gameAreaSize={gameAreaSize}
                        answer={answer} 
                        targetNumber={index}
                        onSetTarget={handleSetTarget}
                        isVisible={isTargetVisible[index]}
                    />)
                }
                <Player 
                    gameAreaSize={gameAreaSize}
                    checkBulletCollision={handleCheckBulletCollision} 
                    lives={playerLives}
                />
                
                <Monster 
                    gameAreaSize={{width: width-100, height: height-50}}
                    question={question} 
                    lives={monsterLives}
                />
                
                </>
            </S.GameArea>
            </>
            }
        </S.Container>
    )
}

export default Game