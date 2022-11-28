import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../UI/Input/Input';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/slices/userSlice/userSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Modal from '../../modals/Modal';
import { useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../UI/Button/Button';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';

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
    required: true,
  },
];

export default function SignIn() {
  const { isAuth, id } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
          })
        );
        navigate('/');
      })
      .catch(() => {
        setActive(true);
      });
  };

  useEffect(() => {
    try {
      if (id !== '') {
        onSnapshot(doc(db, 'users', id), (doc) => {
          let user = Object.assign(doc.data());
          dispatch(
            setUser({
              email: user.email,
              id: user.id,
              isManager: user.isManager,
              login: user.login,
              name: user.name,
              surname: user.surname,
              img: user.img,
            })
          );
          localStorage.setItem('user', JSON.stringify(user));
        });
      }
    } catch (err) {
      console.log('No such document!');
    }
  }, [isAuth, id, dispatch]);

  return (
    <form
      action='#'
      className='form form_signIn'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h3 className='title'>Login</h3>
      {inputs.map((input) => (
        <Input
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
        />
      ))}
      <div>
        <Button success={true} onClick={handleLogin}>
          Sign in
        </Button>
      </div>
      <Modal active={active} setActive={setActive}>
        <p>Your password or email is invalid!</p>
      </Modal>
    </form>
  );
}
