import React, { useState } from 'react';
import './updateEvent.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { db } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { updateEvent } from '../../../store/slices/eventSlice/eventSlice';
import { useDispatch } from 'react-redux';

const inputsUpdateEvent = [
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
    min: 1,
  },
];

export default function UpdateEvent({ data, setActive }) {
  const { id } = data;

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    title: data.title,
    description: data.description,
    img: data.img,
    price: data.price,
  });

  const handleCancel = () => {
    setValues({
      title: data.title,
      description: data.description,
      price: data.price,
    });
    setActive(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { title, description, price } = values;
    dispatch(updateEvent({ id, title, description, price }));
    const eventRef = doc(db, 'events', `${data.id}`);
    await updateDoc(eventRef, {
      title,
      description,
      price,
    });
    setActive(false);
  };

  return (
    <>
      <h2>Update Event?</h2>
      <form className='update-event' onSubmit={(e) => e.preventDefault()}>
        <div className='block'>
          <img src={data.img} alt='Event' className='img' />
        </div>
        <div className='block'>
          {inputsUpdateEvent.map((input) => {
            return <Input
              key={input.id}
              {...input}
              onChange={onChange}
              value={values[input.name]}
            />;
          })}
          <div className='buttons'>
            <Button success={true} onClick={handleUpdate}>
              Update
            </Button>
            <Button success={false} onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
