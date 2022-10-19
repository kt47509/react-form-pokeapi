import axios from 'axios';
import { useState, useEffect } from 'react';

const PokemonInput = (props) => {

  const [pokemon, setPokemon] = useState([]);
  const [value, setValue] = useState(props.userInfo.favoritePokemon);
  const [loading, setLoading] = useState(true);
  const [unfocused, setUnfocused] = useState(false);

  const handleFocus = (e) => {
    setUnfocused(true);
  }

  const onChange = (e) => {
    setValue(e.target.value)
    props.setUserInfo({ ...props.userInfo, favoritePokemon: e.target.value })
  }

  const handleBack = () => {
    props.previousStep();
  }

  const handleNext = (value) => {
    if (pokemon.includes(value)) {
      props.setUserInfo({ ...props.userInfo, favoritePokemon: value });
      props.nextStep();
    } else {
      setValue("");
    }
  }

  const handleSelect = (selection) => {
    props.setUserInfo({ ...props.userInfo, favoritePokemon: selection });
    setValue(selection);
  }

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0").then(res => {
      setPokemon(res.data.results.map(p => p.name));
      setLoading(false);
    })
  }, [])

  if (loading) return "Loading..."

  return (
      <div className="searchContainer">
        <div className="searchInner">
          <label>What is your favorite pokemon?</label>
          <input required={true} type="text" value={value} onChange={onChange} onBlur={handleFocus} unfocused={unfocused.toString()} />
          <span>please enter a valid pokemon</span>
        </div>
        <div className="dropdown">
          {pokemon
            .filter(pokemon => {
              const searchTerm = value.toLowerCase();
              const pokemonName = pokemon.toLowerCase();
              return searchTerm && pokemonName.startsWith(searchTerm) && searchTerm !== pokemonName;
            })
            .map(p => (
              <li onClick={() =>  handleSelect(p)} key={p}>{p}</li>
            ))}
        </div>
        <div className="buttonContainer">
          <button onClick={handleBack}>Back</button>
          <button onClick={()=> handleNext(value)}>Next</button>
        </div>
      </div>
  )
}


export default PokemonInput;