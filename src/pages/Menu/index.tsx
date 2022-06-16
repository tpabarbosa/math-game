import * as S from './styles'
import WorldMap from './WorldMap'
import {IWorldMap, worlds} from '../../data/worlds'
import { useEffect, useState } from 'react';

const openWorlds = 2;

const Menu = () => {
    const [maps, setMaps] = useState<IWorldMap[]>([])

    useEffect(()=> {
        setMaps(worlds.filter(world => world.id <= openWorlds).reverse())
    }, [])

    return (
        <S.Container>
            <S.Title>Menu</S.Title>
            <S.World>
                {maps.map((map) => <WorldMap key={map.id} map={map}></WorldMap>)}
                
            </S.World>
        </S.Container>
    )
}

export default Menu