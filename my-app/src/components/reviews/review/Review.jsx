import React, { useEffect } from 'react';
import './review.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { removeReview } from '../../../store/slices/reviewSlice/reviewSlice';
import { useAuth } from '../../../hooks/useAuth';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useState } from 'react';

export default function Review({ feedback, readOnly }) {
  const dispatch = useDispatch();
  const { isManager, isAuth, login } = useAuth();
  const { userId, review, id } = feedback;
  const [user, setUser] = useState({});

  const users = useSelector((state) => state.user.users);

  const handleDelete = async () => {
    dispatch(removeReview({ id }));
    try {
      await deleteDoc(doc(db, 'reviews', `${id}`));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUser(users.find((element) => element.id === userId));
  }, [login, users, userId, user])

  return (
    <div className='review-box'>
      <div className='box-top'>
        <div className='profile'>
          <div className='profile-img'>
            <img
              src={
                user.img === undefined || user.img === ''
                  ? 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
                  : user.img
              }
              alt='avatar'
            />
          </div>
          <div className='name-user'>
            <strong>
              {user.name === '' || user.surname === ''
                ? 'Unknown user'
                : `${user.name} ${user.surname}`}
            </strong>
            <span>{user.login === '' ? '@unknown' : `@${user.login}`}</span>
          </div>
        </div>
      </div>

      <div className='comment'>
        <p>{review}</p>
        {isManager && isAuth && readOnly === false ? (
          <p className='comment-remove' onClick={handleDelete}>
            Remove
            <DeleteIcon />
          </p>
        ) : null}
      </div>
    </div>
  );
}
