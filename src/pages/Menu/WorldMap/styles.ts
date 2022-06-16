import styled from 'styled-components'


export const Container = styled.div`
    width: 90%;
    margin: 0 auto;
    margin-bottom: 30px;
    position: relative;
`

export const Image = styled.img`
    width: 100%;
    max-height: 560px;
`

export const Title = styled.h1`
    font-size: 24px;
    text-align: center;
    width: 100%;
    background-color: springgreen;
    opacity: 0.75;
    padding: 10px;

    @media (min-width:768px) {
        font-size: 32px;
    }
`