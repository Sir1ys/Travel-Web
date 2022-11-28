import React from 'react';
import { useState } from 'react';
import './input.scss';

export default function Input(props) {
  const { onChange, id, errorMessage, children, ...inputProps } = props;

  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className='block-input'>
      {children ? children : null}
      <input
        className='input'
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
        focused={focused.toString()}
      />
      {errorMessage ? <span>{errorMessage}</span> : null}
    </div>
  );
}
