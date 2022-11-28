import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../hooks/useAuth';
import Modal from '../../modals/Modal';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import AddIcon from '@mui/icons-material/Add';
import './createPackage.scss';
import { addPackage } from '../../../store/slices/packageSlice/packageSlice';
import { db, storage } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const inputsCreatePackage = [
  {
    id: 'title',
    name: 'title',
    type: 'text',
    placeholder: 'Title',
  },
  {
    id: 'description',
    name: 'description',
    type: 'text',
    placeholder: 'Description',
  },
  {
    id: 'price',
    name: 'price',
    type: 'number',
    placeholder: 'Price',
  },
  {
    id: 'duration',
    name: 'duration',
    type: 'number',
    placeholder: 'Duration',
  },
];

export default function CreatePackage() {
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);
  const [per, setPer] = useState(null);
  const [values, setValues] = useState({
    title: '',
    description: '',
    img: '',
    price: '',
    duration: '',
  });
  const [packagE, setItem] = useState('');

  const { isAuth, isManager } = useAuth();

  const handleActive = () => {
    setActive(true);
  };

  const handleCreate = async () => {
    if (
      (values.title !== '' && values.description !== '' && packagE !== '',
      values.price !== '')
    ) {
      let packageID = Date.now();
      const { title, description, img, price, duration } = values;
      dispatch(
        addPackage({
          packageID,
          title,
          description,
          img,
          price,
          duration,
        })
      );
      await setDoc(doc(db, 'packages', `${packageID}`), {
        title,
        description,
        img,
        price,
        duration,
      });
      handleCancel();
    } else {
      console.log('All inputs should be filled!');
    }
  };

  const handleCancel = () => {
    setValues({
      title: '',
      description: '',
      price: '',
      duration: '',
    });
    setItem('');
    setActive(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //upload file
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + packagE.name;

      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, packagE);

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
    packagE && uploadFile();
  }, [packagE]);

  return (
    <>
      {isAuth && isManager ? (
        <div className='box-create'>
          <div>
            <h2 className='subtitle'>Do you want to create a Package?</h2>
            <Button success={true} onClick={handleActive}>
              Create
            </Button>
          </div>
        </div>
      ) : null}
      <Modal active={active} setActive={setActive}>
        <h2>Create Package?</h2>
        <form className='create-package' onSubmit={(e) => e.preventDefault()}>
          <div className='block'>
            {packagE === '' ? (
              <div>
                <input
                  type='file'
                  id='packagE'
                  name='packagE'
                  accept='/image*'
                  onChange={(e) => setItem(e.target.files[0])}
                />
                <label htmlFor='packagE'>
                  Choose a Photo
                  <AddIcon className='icon' />
                </label>
              </div>
            ) : (
              <img
                src={URL.createObjectURL(packagE)}
                alt='Event'
                className='img'
              />
            )}
          </div>
          <div className='block'>
            {inputsCreatePackage.map((input) => (
              <Input
                key={input.id}
                {...input}
                onChange={onChange}
                value={values[input.name]}
              />
            ))}
            <div className='buttons'>
              <Button
                success={true}
                onClick={handleCreate}
                disabled={per !== null && per < 100}
              >
                Create
              </Button>
              <Button success={false} onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
