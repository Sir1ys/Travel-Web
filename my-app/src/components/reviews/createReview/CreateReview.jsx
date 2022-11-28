import React, { useState } from 'react';
import './createReview.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { useDispatch } from 'react-redux';
import { addReview } from '../../../store/slices/reviewSlice/reviewSlice';
import { useAuth } from '../../../hooks/useAuth';
import { db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function CreateReview({ setActive }) {
  const { id } = useAuth();

  const [review, setReview] = useState('');

  const dispatch = useDispatch();

  const userId = id;

  const onChange = (e) => {
    setReview(e.target.value);
  };

  const handleCreate = async () => {
    const id = Date.now();
    dispatch(
      addReview({
        review,
        userId,
        id,
      })
    );
    await setDoc(doc(db, 'reviews', `${id}`), {
      review,
      userId,
      id,
    });
    handleCancel();
  };

  const handleCancel = () => {
    setReview('');
    setActive(false);
  };

  return (
    <div className='create-review'>
      <h1> Do you want to create Review?</h1>
      <Input onChange={onChange} value={review} />
      <div className='create-review__buttons'>
        <Button success={true} onClick={handleCreate}>
          Create
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
}
