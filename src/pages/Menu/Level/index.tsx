import { useNavigate } from 'react-router-dom'
import { ILevel } from '../../../data/worlds'
import * as S from './styles'

type LevelProps = {
    world: number,
    level: ILevel
    children: React.ReactNode
}

const Level = ({world, level, children}: LevelProps) => {
    let navigate = useNavigate();
    const {top, left, id} = level;

    const handleClick = () => {
        navigate(`/game/${world}/${id}`, { state: {world, id} });
    }

    return (
        <S.Container top={top} left={left} onClick={handleClick}>
            <div>
                {children}
            </div>
        </S.Container>
        )
}

export default Level