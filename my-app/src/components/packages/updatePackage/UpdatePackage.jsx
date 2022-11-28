import React, { useState } from 'react';
import './updatePackage.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { db } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { updatePackage } from '../../../store/slices/packageSlice/packageSlice';
import { useDispatch } from 'react-redux';

const inputsUpdatePackage = [
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
  {
    id: 'duration',
    name: 'duration',
    type: 'number',
    placeholder: 'Duration',
    min: 1,
  },
];

export default function UpdatePackage({ data, setActive }) {
  const { id } = data;

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    title: data.title,
    description: data.description,
    img: data.img,
    price: data.price,
    duration: data.duration
  });

  const handleCancel = () => {
    setValues({
      title: data.title,
      description: data.description,
      price: data.price,
      duration: data.duration
    });
    setActive(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { title, description, price, duration } = values;
    dispatch(updatePackage({ id, title, description, price, duration }));
    const packageRef = doc(db, 'packages', data.id);
    await updateDoc(packageRef, {
      title,
      description,
      price,
      duration
    });
    setActive(false);
  };

  return (
    <>
      <h2>Update Package?</h2>
      <form className='update-package' onSubmit={(e) => e.preventDefault()}>
        <div className='block'>
          <img src={data.img} alt='Package' className='img' />
        </div>
        <div className='block'>
          {inputsUpdatePackage.map((input) => {
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
