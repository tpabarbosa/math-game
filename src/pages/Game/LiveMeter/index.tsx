import { ISize } from '../interfaces'
import * as S from '../styles'

type LiveMeterProps = {
    lives: number,
    position: 'start' | 'end',
    gameAreaSize: ISize
}

const LiveMeter = ({lives, position, gameAreaSize}: LiveMeterProps) => {
    return (
        <S.LivesMeter lives={lives} gameAreaSize={gameAreaSize} position={position}><div></div>
        </S.LivesMeter>
    )
}

export default LiveMeter