import * as S from '../styles'
import { useEffect, useState } from "react";
import { IEntity, ISize } from '../interfaces';

type PlayerProps = {
    gameAreaSize: ISize
    checkBulletCollision: (bullet: IEntity) => boolean;
    lives: number
}

const BULLET: IEntity = {top: 150, left:180, width:100, height:100}
const PLAYER: IEntity = {top: 100, left:20, width:30, height:10}
const BULLET_SPEED = 30;
const PLAYER_SPEED = 10;

const calcPlayerDimensions = (screenHeight:number)=> {
    const size = Math.floor(screenHeight/6)
    return {height:size, width:size}
}

const calcBulletDimensions = (screenHeight:number)=> {
    const size = screenHeight/60 > 5 ? Math.floor(screenHeight/60) : 5
    return {height: size, width:3*size}
}

const Player = ({gameAreaSize, checkBulletCollision, lives}: PlayerProps) => {

    const [player, setPlayer] = useState<IEntity>({...PLAYER, ...calcPlayerDimensions(gameAreaSize.height) });
    const [bullet, setBullet] = useState<IEntity>({...BULLET, ...calcBulletDimensions(gameAreaSize.height) });

    const [isBulletFired, setIsBulletFired] = useState(false)
    const [timer, setTimer] = useState<NodeJS.Timer | null>(null)

    const moveBullet = () => {
        setBullet(bullet => {
            return {...bullet, left: bullet.left + BULLET_SPEED }
        })
    }

    useEffect(() => {
        setPlayer(player => {
            return {...player, ...calcPlayerDimensions(gameAreaSize.height) }
        })
        setBullet(bullet => {
            return {...bullet, ...calcBulletDimensions(gameAreaSize.height) }
        })
    }, [gameAreaSize])

    useEffect(() => {
        if (isBulletFired && bullet.left > 0.9*gameAreaSize.width) {
            if (timer) {
                clearInterval(timer)
                setTimer(null);
            };
            setIsBulletFired(value => !value)
            return;
        } 
        if (isBulletFired) {
            const collided = checkBulletCollision(bullet);
            if (collided) {
                if (timer) {
                    clearInterval(timer)
                    setTimer(null);
                };
                setIsBulletFired(value => !value)
            }
        }
    }, [isBulletFired, timer, player, bullet, gameAreaSize.width, checkBulletCollision])

    const handleFireBullet = () => {
        const t = setInterval(moveBullet, 50);
        setTimer(t)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        if (e.key==='ArrowDown') {
            if (player.top < gameAreaSize.height- player.height -PLAYER_SPEED) {
                setPlayer(player => {
                    return {...player, top: player.top + PLAYER_SPEED}
                })
            }
        } else if (e.key==='ArrowUp') {
            if (player.top > 0) {
                setPlayer(player => {
                    return {...player, top: player.top - PLAYER_SPEED}
                })
            }
        } else if (e.key === ' ') {
            if (!isBulletFired) {
                setIsBulletFired(true)
                handleFireBullet()
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    })

    useEffect(() => {
        if (!isBulletFired) {
            setBullet(bullet => {
                return {
                    ...bullet, 
                    left: player.left+player.width, 
                    top: Math.floor(player.top + (player.height-bullet.height)/2)
                }
            })
        }
    }, [isBulletFired,player])

    return (
        <>
            
            <S.Entity entity={player} color={'red'}></S.Entity>
            {isBulletFired && 
            <S.Entity entity={bullet} color={'black'}></S.Entity>
            }
        </>
        )
}

export default Player