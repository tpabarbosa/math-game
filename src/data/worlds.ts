import worldMap1 from '../assets/images/worldMaps/worldmap1.jpg'
import worldMap2 from '../assets/images/worldMaps/worldmap2.jpg'

export const worlds = [
    {
        id: 1,
        name: 'Adição até 5',
        image: worldMap1,
        levels: [
            {
                id: 1,
                top: 0.85,
                left: 0.23,
            },
            {
                id: 2,
                top: 0.76,
                left: 0.4,
            },
            {
                id: 3,
                top: 0.73,
                left: 0.55,
            },
        ]
    },
     {
        id: 2,
        name: 'Adição até 10',
        image: worldMap2,
        levels: [
            {
                id: 1,
                top: 0.8,
                left: 0.1,
            },
            {
                id: 2,
                top: 0.7,
                left: 0.2,
            },
            {
                id: 3,
                top: 0.65,
                left: 0.35,
            },
        ]
    }
]

export interface IWorldMap {
    id: number,
    name: string,
    image: string,
    levels: ILevel[]
}

export interface ILevel {
    id: number,
    top: number,
    left: number,
}