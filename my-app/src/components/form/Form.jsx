import React from 'react';
import './form.scss';
import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';

export default function Form() {
  return (
    <div className='container-form'>
      <div className='block'>
        <div className='block__item block-item'>
          <h2 className='title'>Do you have an account?</h2>
          <button
            className='button'
            onClick={() =>
              document.querySelector('.form-box').classList.remove('active')
            }
          >
            Sign In
          </button>
        </div>

        <div className='block__item block-item'>
          <h2 className='title'>Don't have an account?</h2>
          <button
            className='button'
            onClick={() =>
              document.querySelector('.form-box').classList.add('active')
            }
          >
            Sigh up
          </button>
        </div>
      </div>

      <div className='form-box'>
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
}
