import './Pokemons.css'
import Autocomplete from '@mui/joy/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import Miau from '../../assets/miau.png'
import Miau1 from '../../assets/miau1.png'
import { useState, useEffect } from 'react';
import { IGetAllPokemonsReturn, PokemonService } from '../../services/pokemonservice';
import Card from '../../components/Card/Card';
import { MdCatchingPokemon } from 'react-icons/md';

function Pokemons() {

  const [pokemons, setPokemons] = useState<IGetAllPokemonsReturn[]>([]);  

  const getPokemons = async () => {
    const response = await PokemonService.getAllPokemons()
    setPokemons(response);
  }

  const pokemonsNames = pokemons.map(props => props.name )

  useEffect(() => {
    getPokemons()
  }, [])
  
  return (
    <div className='body'>
      <div className="body-img-right">
        <img src={Miau} alt="" />
      </div>
      <div className="body-img-left">
        <img src={Miau1} alt="" />
      </div>
      <div className='header'>
        <Autocomplete
          placeholder="Search pokemon"
          startDecorator={<SearchIcon sx={{color: "#FAFDFC"}} />}
          className='header-autocomplete'
          options={pokemonsNames}
          sx={{backgroundColor: "#ffffff15", border: "none", color: "#FAFDFC", ':hover': {color: 'white', backgroundColor: '#fafdfc2f'}, }}
          freeSolo
        />
        <p><MdCatchingPokemon /> POKÉDEX</p>
      </div>
      <div className="cards">
        {pokemons.map(props => 
          <Card pokemon={props}/>
        )}
      </div>
    </div>
  )
}

export default Pokemons
