import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import AddIcon from '@mui/icons-material/Add';
import Review from './review/Review';
import CreateReview from './createReview/CreateReview';
import Modal from '../modals/Modal';
import './reviewsList.scss';

export default function ReviewList({ readOnly }) {
  const reviews = useSelector((state) => state.reviews.reviews);

  const { isManager, isAuth } = useAuth();

  const [active, setActive] = useState(false);

  return (
    <>
      {readOnly === false ? (
        <div className='rewiews-block'>
          {isManager === false && isAuth === true ? (
            <div onClick={() => setActive(true)}>
              <span>Create</span>
              <AddIcon />
            </div>
          ) : null}
        </div>
      ) : null}
      <div className='box-container'>
        {readOnly === false
          ? reviews.map((feedback) => (
              <Review
                key={feedback.id}
                feedback={feedback}
                readOnly={readOnly}
              />
            ))
          : reviews.slice(0,4).map((feedback) => (
              <Review
                key={feedback.id}
                feedback={feedback}
                readOnly={readOnly}
              />
            ))}
      </div>
      <Modal active={active} setActive={setActive}>
        <CreateReview setActive={setActive} />
      </Modal>
    </>
  );
}
