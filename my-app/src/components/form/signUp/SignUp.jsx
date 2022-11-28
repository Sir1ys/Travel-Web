import React, { useState } from 'react';
import Input from '../../UI/Input/Input';
import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../../store/slices/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const inputs = [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Write valid email!',
      required: true,
    },
    {
      id: 'pass',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      pattern:
        '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      required: true,
    },
    {
      id: 'confirm',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm password',
      errorMessage: "Passwords don't match!",
      pattern: values.password,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            isManager: false,
            login: '',
            name: '',
            surname: '',
            img: '',
          })
        );
      
        setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          password: values.password,
          id: user.uid,
          isManager: false,
          login: '',
          name: '',
          surname: '',
          img: '',
        });

        navigate('/');
      })
      .catch(console.error);
  };

  return (
    <form
      action='#'
      className='form form_signUp'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h3 className='title'>Register</h3>
      {inputs.map((input) => {
        return (
          <Input
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        );
      })}
      <div>
        <Button success={true} onClick={handleRegister}>
          Sign up
        </Button>
      </div>
    </form>
  );
}
