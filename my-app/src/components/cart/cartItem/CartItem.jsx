import React from 'react';
import './cartItem.scss';
import { useDispatch } from 'react-redux';
import { removeOrder } from '../../../store/slices/orderSlice/orderSlice';

export default function CartItem(props) {
  const { img, price, quantity, title, id } = props;

  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    dispatch(removeOrder(id));
  };

  return (
    <tr>
      <td>
        <div className='content'>
          <img src={img} alt='Product' />
          <div>
            <p>{title}</p>
            <small>
              Price: {price}$
            </small>
            <button
              onClick={() => removeFromCart(id)}
            >
              Remove
            </button>
          </div>
        </div>
      </td>
      <td>{quantity}</td>
      <td>
        {quantity * price}$
      </td>
    </tr>
  );
}
