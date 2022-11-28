import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { storage, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addEvent } from '../../../store/slices/eventSlice/eventSlice';
import AddIcon from '@mui/icons-material/Add';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Modal from '../../modals/Modal';
import './createEvent.scss';

const inputsCreateEvent = [
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
];

export default function CreateEvent() {
  const { isAuth, isManager } = useAuth();

  const dispatch = useDispatch();

  const [active, setActive] = useState(false);
  const [per, setPer] = useState(null);
  const [values, setValues] = useState({
    title: '',
    description: '',
    img: '',
    price: 0,
  });
  const [event, setEvent] = useState('');

  const handleActive = () => {
    setActive(true);
  };

  const handleCreate = async () => {
    if (
      (values.title !== '' && values.description !== '' && event !== '',
      values.price !== '')
    ) {
      let eventID = Date.now();
      const { title, description, img, price } = values;
      dispatch(
        addEvent({
          eventID,
          title,
          description,
          img,
          price,
        })
      );
      await setDoc(doc(db, 'events', `${eventID}`), {
        title,
        description,
        img,
        price,
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
      price: 0,
    });
    setEvent('');
    setActive(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //upload file
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + event.name;

      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, event);

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
    event && uploadFile();
  }, [event]);

  return (
    <>
      {isAuth && isManager ? (
        <div className='box-create'>
          <div>
            <h2 className='subtitle'>Do you want to create an Event?</h2>
            <Button success={true} onClick={handleActive}>
              Create
              <AddIcon sx={{ fontSize: '2rem' }} />
            </Button>
          </div>
        </div>
      ) : null}

      <Modal active={active} setActive={setActive}>
        <h2>Create Event?</h2>
        <form className='create-event' onSubmit={(e) => e.preventDefault()}>
          <div className='create-event__block'>
            {event === '' ? (
              <div>
                <input
                  type='file'
                  id='event'
                  name='event'
                  accept='/image*'
                  onChange={(e) => setEvent(e.target.files[0])}
                />
                <label htmlFor='event'>
                  Choose a Photo
                  <AddIcon className='icon' />
                </label>
              </div>
            ) : (
              <img
                src={URL.createObjectURL(event)}
                alt='Event'
                className='create-event__img'
              />
            )}
          </div>
          <div className='create-event__block'>
            {inputsCreateEvent.map((input) => (
              <Input
                key={input.id}
                {...input}
                onChange={onChange}
                value={values[input.name]}
              />
            ))}
            <div className='create-event__buttons'>
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
