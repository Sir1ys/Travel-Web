import React, { useState } from 'react';
import './event.scss';
import Button from '../../UI/Button/Button';
import { useAuth } from '../../../hooks/useAuth';
import Modal from '../../modals/Modal';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import UpdateEvent from '../updateEvent/UpdateEvent';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { removeEvent } from '../../../store/slices/eventSlice/eventSlice';

export default function Event({ event, addToBasket, readOnly = false }) {
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);

  const { isManager } = useAuth();

  const { img, title, description, id, price } = event;

  const handleDelete = async () => {
    dispatch(removeEvent({ id }));
    try {
      await deleteDoc(doc(db, 'events', `${id}`));
    } catch (err) {
      console.log(err);
    }
  };

  const handleActive = () => {
    setActive(true);
  };

  return (
    <div className='box event-box'>
      <img src={img} alt='Event' />
      <div className='content'>
        <h3>{title}</h3>
        <p>{description}</p>
        {readOnly === false ? (
          isManager === true ? (
            <>
              <div className='buttons'>
                <Button success={true} onClick={handleActive}>
                  Edit
                </Button>
                <Button success={false} onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </>
          ) : (
            <div className='price-info'>
              <span>Price: {price}$</span>
              <div className='cart'>
                <ShoppingCartIcon
                  className='icon'
                  onClick={() => addToBasket(event)}
                />
              </div>
            </div>
          )
        ) : null}
      </div>
      <Modal active={active} setActive={setActive}>
        <UpdateEvent data={event} setActive={setActive} />
      </Modal>
    </div>
  );
}
