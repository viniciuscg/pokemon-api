import './Status.css'
import { useState, useEffect } from 'react';
import { IGetPokemonDetails, IGetPokemonResponse, PokemonService } from '../../services/pokemonservice';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md'
import  Shadow  from '../../assets/shadow-type.png';
import  Unknown  from '../../assets/unknown.png';

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

const pokemonTypes = {
  fighting: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/fighting.svg',
  normal: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/normal.svg',
  flying: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/flying.svg',
  poison: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/poison.svg',
  rock: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/rock.svg',
  bug: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/bug.svg',
  ghost: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/ghost.svg',
  steel: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/steel.svg',
  fire: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/fire.svg',
  water: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/water.svg',
  grass: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/grass.svg',
  electric: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/electric.svg',
  psychic: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/psychic.svg',
  ice: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/electric.svg',
  dragon: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/ice.svg',
  dark: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/dark.svg',
  fairy: 'https://raw.githubusercontent.com/monikode/pokedex/2cd5b251683f9be09c0d5b29e3f36eede449e65f/assets/icons/fairy.svg',
  unknown: Unknown,
  ground: 'https://img.rankedboost.com/wp-content/plugins/pokemon-scarlet-violet/assets/pokemon-type-images/Ground%20Pokemon%20List.png',
  shadow: Shadow,
}

function Status() {

  const [pokemonStats, setPokemonStats] = useState<IGetPokemonResponse>();  
  const [pokemonDetails, setPokemonDetails] = useState<IGetPokemonDetails>();  
  const [pokemonEvolution, setPokemonEvolution] = useState<string>();  
  const { id } = useParams()
  const navigate = useNavigate()

  const getPokemonStats = async () => {
    const response = await PokemonService.getPokemonStats(Number(id))
    setPokemonStats(response);
  }
  const getPokemonDetails = async () => {
    const response = await PokemonService.getPokemonDetails(Number(id))
    setPokemonDetails(response);
  }
  const getPokemonEvolutions = async () => {
    const response = await PokemonService.getPokemonEvolutions(Number(id))
    const { name } = response.chain.evolves_to[0]?.species
    setPokemonEvolution(name)    
  }

  const colorName = pokemonDetails?.color.name

  const goPagePokemons = async () => {
    navigate("/");
  }


  useEffect(() => {
    getPokemonStats()
    getPokemonDetails()
    getPokemonEvolutions()
  }, [])
  
  return (
    <div className='status-body' style={{background: colorName ? colors[colorName] : "white"}}>
      <div className='arrow-back-home' onClick={goPagePokemons}> <MdArrowBackIosNew style={{position: "absolute"}}/> </div>
      <div className="status-pokemon">
        <div className="status-header"><p>evolves to: {pokemonEvolution} </p></div>
        <div className="status-pokemon-content">

          <div className='status-pokemon-body'>
            <div className="status-pokemon-name-type">
              <div className='status-pokemon-type-img'>
                {pokemonStats?.types[0].type.name && (
                  <img style={{width: "100px"}} src={pokemonTypes[pokemonStats?.types[0].type.name]} alt="" />
                )}
              </div>
              <div className="status-pokemon-name-type-content">
                <p>{pokemonStats?.types[0].type.name}</p>
                <h1>{pokemonStats?.name}</h1>
              </div>
            </div>
            <div className='status-pokemon-stat'>
              <div className="height">
                <h2>Height</h2>
                <h3>{pokemonStats?.height}</h3>
              </div>
              <div className="weight">
                <h2>Weight</h2>
                <h3>{pokemonStats?.weight}</h3>
              </div>
            </div>
          </div>
          <div className="status-pokemon-img">
            <img style={{width: "450px"}} src={pokemonStats?.sprites.other['official-artwork'].front_default} alt="img" />
          </div>

        </div>
        <div className='status-id-body'> #{id?.padStart(3, '0')} </div>
      </div>
    </div>
  )
}

export default Status
