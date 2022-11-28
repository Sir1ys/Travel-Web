import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../UI/Button/Button';
import './package.scss';
import { useDispatch } from 'react-redux';
import { removePackage } from '../../../store/slices/packageSlice/packageSlice';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Modal from '../../modals/Modal';
import UpdatePackage from '../updatePackage/UpdatePackage';

export default function Package({ data, readOnly, addToBasket }) {
  const { isManager } = useAuth();

  const [active, setActive] = useState(false);

  const { id, img, title, description, price, duration } = data;

  const dispatch = useDispatch();

  const handleActive = () => {
    setActive(true);
  };

  const handleDelete = async () => {
    dispatch(removePackage({ id }));
    try {
      await deleteDoc(doc(db, 'packages', `${id}`));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='package-box'>
      <div className='image'>
        <img src={img} alt='package' />
      </div>
      <div className='content'>
        <h3>{title}</h3>
        <p>{description}</p>

        {readOnly === false ? (
          isManager ? (
            <div className='buttons'>
              <Button success={true} onClick={handleActive}>
                Edit
              </Button>
              <Button success={false} onClick={handleDelete}>
                Delete
              </Button>
            </div>
          ) : (
            <>
              <div className='price'>
                <div>{price}$</div>
                <div>{duration} days</div>
              </div>
              <Button success={true} onClick={() => addToBasket(data)}>
                Add to cart
              </Button>
            </>
          )
        ) : null}
      </div>
      <Modal active={active} setActive={setActive}>
        <UpdatePackage data={data} setActive={setActive} />
      </Modal>
    </div>
  );
}
