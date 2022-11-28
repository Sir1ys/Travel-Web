import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../store/slices/orderSlice/orderSlice';
import CreateEvent from './createEvent/CreateEvent';
import Event from './event/Event';

export default function EventsList({ readOnly = false }) {
  const events = useSelector((state) => state.events.events);

  const dispatch = useDispatch();

  const addToBasket = (event) => {
    dispatch(addOrder(event));
  };
  return readOnly === false ? (
    <>
      <CreateEvent />
      {events.map((event) => {
        return (
          <Event
            key={event.id}
            event={event}
            readOnly = {readOnly}
            addToBasket={addToBasket}
          />
        );
      })}
    </>
  ) : (
    <>
      {events.slice(0, 3).map((event) => {
        return <Event key={event.id} event={event} readOnly={readOnly}/>;
      })}
    </>
  );
}
