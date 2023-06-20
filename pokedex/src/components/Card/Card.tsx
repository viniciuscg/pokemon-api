import { IGetAllPokemonsReturn } from '../../services/pokemonservice'
import './Card.css'
import { useNavigate } from 'react-router-dom';

interface IProps {
  pokemon: IGetAllPokemonsReturn;
}

const colors = {
  black: 'linear-gradient(16deg, rgba(13,13,13,1) 0%, rgba(133,133,133,1) 65%)',
  blue: 'linear-gradient(16deg, rgba(28,28,249,1) 0%, rgba(100,100,255,1) 61%)',
  brown: 'linear-gradient(16deg, rgba(64,23,23,1) 0%, rgba(165,42,42,1) 61%)',
  gray: 'linear-gradient(16deg, rgba(64,64,64,1) 0%, rgba(184,184,208,1) 61%)',
  green: 'linear-gradient(16deg, rgba(11,122,11,1) 0%, rgba(63,164,63,1) 47%)',
  pink: 'linear-gradient(16deg, rgba(240,92,125,1) 0%, rgba(242,175,190,1) 61%)',
  purple: 'linear-gradient(16deg, rgba(160,64,160,1) 0%, rgba(223,125,223,1) 61%)',
  red: 'linear-gradient(16deg, rgba(232,38,38,1) 0%, rgba(245,118,118,1) 61%)',
  white: 'linear-gradient(16deg, rgba(164,164,164,1) 0%, rgba(242,236,237,1) 61%)',
  yellow: 'linear-gradient(16deg, rgba(255,238,169,1) 0%, rgba(251,204,10,1) 61%)',
}

function Card(props: IProps) {

  const navigate = useNavigate()

  const gotoStatus = async () => {
    navigate(`/Status/${props.pokemon.id}`);
  }

  return (
    <div className="card" onClick={gotoStatus}>
      <div className="cards-content" style={{background: props.pokemon.color ? colors[props.pokemon.color] : "white"}}>
        <img src={props.pokemon.sprites.other['official-artwork'].front_default} alt="img" />
        <h2>{props.pokemon.name}</h2>
      </div>
    </div>
  )
}

export default Card
