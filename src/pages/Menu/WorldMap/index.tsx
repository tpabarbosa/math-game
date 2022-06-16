import { IWorldMap } from "../../../data/worlds"
import Level from "../Level"
import * as S from './styles'
type WorldMapProps = {
    map: IWorldMap
}

const WorldMap = ({map}: WorldMapProps) => {
    const {id, name, image, levels} = map
    return (
        <S.Container >
            <S.Title>WorldMap {id} - {name}</S.Title>
            <S.Image src={image} />  
            {levels.map(level => <Level key={level.id} world={id} level={level}>{level.id}</Level>)}
        </S.Container>
    )
}

export default WorldMap