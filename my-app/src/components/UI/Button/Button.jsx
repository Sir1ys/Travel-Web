import React from 'react';
import './button.scss';

export default function Button({ success, onClick, children, disabled}) {
  return (
    <button
      className={success ? 'button-success button' : 'button-failed button'}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
