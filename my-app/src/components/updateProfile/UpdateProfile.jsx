import React, { useState, useEffect } from 'react';
import './updateProfile.scss';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Input from '../UI/Input/Input';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../firebase';
import Button from '../UI/Button/Button';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import { updateUser } from '../../store/slices/userSlice/userSlice';
import { useDispatch } from 'react-redux';

const inputsUpdateProfile = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'Name',
  },
  {
    id: 'surname',
    name: 'surname',
    type: 'text',
    placeholder: 'Surname',
  },
  {
    id: 'login',
    name: 'login',
    type: 'text',
    placeholder: 'Login',
  },
];

export default function UpdateProfile({ setActive }) {
  const {
    isManager,
    email,
    id,
    img: currentImg,
    login: currentLogin,
    surname: currentSurname,
    name: currentName,
  } = useAuth();

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: '',
    surname: '',
    login: '',
    img: '',
  });

  const [file, setFile] = useState('');

  const [per, setPer] = useState(null);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleCancel = () => {
    setValues({
      name: '',
      surname: '',
      login: '',
      img: '',
    });
    setActive(false);
    setFile('');
  };

  const handleUpdate = async () => {
    const { login, img } = values;
    const name = capitalizeFirstLetter(values.name);
    const surname = capitalizeFirstLetter(values.surname);
    const eventRef = doc(db, 'users', id);
    dispatch(
      updateUser({
        name: name === '' ? currentName : name,
        surname: surname === '' ? currentSurname : surname,
        login: login === '' ? currentLogin : login,
        img: img === '' ? currentImg : img,
        id,
      })
    );

    try {
      await updateDoc(eventRef, {
        name: name === '' ? currentName : name,
        surname: surname === '' ? currentSurname : surname,
        login: login === '' ? currentLogin : login,
        img: img === '' ? currentImg : img,
      });
    } catch (err) {
      console.log(err);
    }
    localStorage.setItem(
      'user',
      JSON.stringify({
        id,
        email,
        name: name === '' ? currentName : name,
        surname: surname === '' ? currentSurname : surname,
        login: login === '' ? currentLogin : login,
        img: img === '' ? currentImg : img,
        isManager,
      })
    );
    handleCancel();
  };

  //upload file
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPer(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setValues((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  return (
    <>
      <h2>Update profile!</h2>
      <form className='update-profile' onSubmit={(e) => e.preventDefault()}>
        {file === '' ? (
          <div>
            <input
              type='file'
              id='file'
              name='file'
              accept='/image*'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor='file'>
              Choose a Photo
              <AddAPhotoIcon className='icon' />
            </label>
          </div>
        ) : (
          <img src={URL.createObjectURL(file)} alt='Event' className='img' />
        )}
        <div>
          {inputsUpdateProfile.map((input) => {
            return (
              <Input
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            );
          })}
          <div className='buttons'>
            <Button
              success={true}
              onClick={() => handleUpdate()}
              disabled={per !== null && per < 100}
            >
              Update
            </Button>
            <Button onClick={() => handleCancel()}>Cancel</Button>
          </div>
        </div>
      </form>
    </>
  );
}
