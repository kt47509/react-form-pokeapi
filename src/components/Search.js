import { useState } from "react";

const Search = ({pokemon}) => {

  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  }

  return (
    <div>
      <div className="searchContainer">
        <div className="searchInner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}>clickme</button>
        </div>
        <div className="dropdown">
          {pokemon
            .filter(pokemon => {
            const searchTerm = value.toLowerCase();
            const pokemonName = pokemon.toLowerCase();
            return searchTerm && pokemonName.startsWith(searchTerm) && searchTerm !== pokemonName;
          })
            .map(p => (
            <li onClick={() => onSearch(p)} key={p}>{p}</li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search;