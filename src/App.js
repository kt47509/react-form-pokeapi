import FormInput from "./components/FormInput";
import PokemonInput from "./components/PokemonInput";
import Confirm from "./components/Confirm";
import Success from "./components/Success";
import useStickyState from "./hooks/stickystate";
import "./styles/App.css"
import "./styles/reset.css"

function App() {

  const [step, setStep] = useStickyState(1, 'CURRENT_STEP');

  const [userInfo, setUserInfo] = useStickyState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    address: "",
    favoritePokemon: ""
  }, 'USER-SUBMITTED-INFO');

  const nextStep = (e) => {
    setStep(step + 1);
  }

  const previousStep = () => {
    setStep(step - 1);
  }

  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const inputs = [
    {
      id: 1,
      name: "firstname",
      type: "text",
      placeholder: "First name",
      errorMessage: "Please enter your first name",
      label: "First name",
      required: true
    },
    {
      id: 2,
      name: "lastname",
      type: "text",
      placeholder: "Last name",
      errorMessage: "Please enter your last name",
      label: "Last name",
      required: true
    },
    {
      id: 3,
      name: "phonenumber",
      type: "tel",
      pattern: "[0-9]{10,14}",
      placeholder: "Phone number",
      errorMessage: "Please enter a valid phone number",
      label: "Phone number",
      required: true,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Address",
      errorMessage: "Please enter your address",
      label: "Address",
      required: true
    }
  ]

  switch (step) {
    case 1:
      return (
        <div className="App">
          <div className="formContainer">
            <form className="firstForm" onSubmit={nextStep}>
              {inputs.map((input) => (
                <FormInput key={input.id} {...input} value={userInfo[input.name]} onChange={onChange} />
              ))}
              <button>Next</button>
            </form>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="App">
          <div className="formContainer">
            <PokemonInput userInfo={userInfo} setUserInfo={setUserInfo} previousStep={previousStep} nextStep={nextStep} />
          </div>
        </div>
      )
    case 3:
      return (
        <div className="App">
          <div className="formContainer">
            <Confirm userInfo={userInfo} previousStep={previousStep} nextStep={nextStep} />
          </div>
        </div>
      )
    case 4:
      return (
        <div className="App">
          <div className="formContainer">
            <Success setStep={setStep} setUserInfo={setUserInfo} />
          </div>
        </div>
      )
  }

}

export default App;
