import { Link } from "react-router-dom"

const Home = () => {

    return (
        <div>
            <h1>Jogo da Matemática</h1>
            <Link to="menu">Iniciar Jogo</Link>
        </div>
    )
}

export default Home