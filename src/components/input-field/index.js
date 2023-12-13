import PropTypes from "prop-types";
import {useId} from "react";
import "./style.css";

function InputField(props) {
  const inputId = useId();
  return (
    <div className="InputField">
      <label htmlFor={inputId}>{props.label}</label>
      <input id={inputId}
             type={props.type}
             name={props.name}
             value={props.value}
             onChange={e => props.onChange(e.target.value)}
             autoComplete="off"/>
    </div>
  );
}

InputField.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

InputField.defaultProps = {
  onChange: () => {
  },
  type: "text",
  label: ""
};

export default InputField;
