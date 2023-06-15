import { IGetAllPokemonsReturn } from '../../services/pokemonservice'
import './Card.css'


interface IProps {
  pokemon: IGetAllPokemonsReturn;
}

const colors = {
  black: '#858585',
  blue: '#6464FF',
  brown: '#A52A2A',
  gray: '#B8B8D0',
  green: '#0B7A0B',
  pink: '#EE99AC',
  purple: '#A040A0',
  red: '#E24242',
  white: '#E3CED0',
  yellow: '#FFD733',
}

function Card(props: IProps) {

  return (
    <div className="card">
      <div className="cards-content" style={{backgroundColor: colors[props.pokemon.color]}}>
        <img src={props.pokemon.sprites.other['official-artwork'].front_default} alt="img" />
        <h2>{props.pokemon.name}</h2>
      </div>
    </div>
  )
}

export default Card
