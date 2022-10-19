import axios from 'axios';
import { useState, useEffect } from 'react';

const Confirm = (props) => {
  const { firstname, lastname, phonenumber, address, favoritePokemon } = props.userInfo;
  const [loading, setLoading] = useState(true);
  const [pokemonImgUrl, setPokemonImgUrl] = useState("")

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${favoritePokemon}`).then(res => {
      setPokemonImgUrl(res.data.sprites.front_default);
      setLoading(false);
    })
  }, [])

  const submitInfo = () => {
    // back end form processing here
    props.nextStep();
  }

  if (loading) return "Loading..."

  return (
    <div className="formConfirm">
      <h1>Confirm and Submit</h1>
      <ul>
        <li>
          {firstname} {lastname}
        </li>
        <li>
          {phonenumber}
        </li>
        <li>
          {address}
        </li>
        <li>
          {favoritePokemon}
        </li>
      </ul>
      <img src={pokemonImgUrl} alt="image not available" />
      <div className="buttonContainer">
        <button onClick={props.previousStep}>Back</button>
        <button onClick={submitInfo}>Submit</button>
      </div>
    </div>
  )
}

export default Confirm