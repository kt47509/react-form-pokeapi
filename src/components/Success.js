const Success = ({ setStep, setUserInfo }) => {

  const handleClick = () => {
    setStep(1);
    setUserInfo({
      firstname: "",
      lastname: "",
      phonenumber: "",
      address: "",
      favoritePokemon: ""
    })
  }

  return (
    <div className="success">
      <h1>Success!</h1>
      <button onClick={handleClick}>Start Again</button>
    </div>
  )
}


export default Success;