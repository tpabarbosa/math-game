import styled from 'styled-components'

type ContainerProps = {
    top: number
    left: number
}

// const calcTop = (top: number) => {
//     return 100% - 
// }

// const calcLeft = (left: number) => {

// }

export const Container = styled.div<ContainerProps>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 16px;
    border: 3px ridge white;
    border-radius: 100%;
    font-weight: bold;
    background-color: yellow;
    text-align: center;
    top: ${props => props.top*100}%;
    left: ${props => props.left*100}%;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out color 0.2s ease-in-out;

    :hover {
        background-color: orange;
        border-color: lime;
        animation-name: example;
        animation-duration: 0.6s;
    }

    @keyframes example {
        from {transform: rotateY(0deg);}
        to {transform: rotateY(360deg);}
    }

    @media (min-width: 768px) {
        border-width: 6px;
        width: 60px;
        height: 60px;
        font-size: 24px;
    }

`