import React from 'react';

const Button = (props) => {
  return (
    <button
      className={props.style}
      onClick={() => props.handleButtonClicked(props.value)}
      value={props.value}>
      {props.buttonName}
    </button>
  )
}

export default Button;
