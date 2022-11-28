import React from 'react';
import EventsList from '../../components/events/EventsList';
import './events.scss';

export default function Events({ readOnly = false }) {
  return (
    <section className='events'>
      <h1 className='heading'>Adventure idea!</h1>
      <div className='box-container'>
        <EventsList readOnly={readOnly} />
      </div>
    </section>
  );
}
