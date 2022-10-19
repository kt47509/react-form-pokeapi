import { useState } from "react";
const FormInput = (props) => {
  
  const {label, errorMessage, onChange, id, ...inputProps } = props;
  const [unfocused, setUnfocused] = useState(false);

  const handleFocus = (e) => {
    setUnfocused(true);
  }

  return (
    <div className="formInput">
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} onBlur={handleFocus} unfocused={unfocused.toString()} />
      <span>{errorMessage}</span>
    </div>
  )
}

export default FormInput