import React from 'react';
import ReviewsList from '../../components/reviews/ReviewsList';

export default function Reviews({ readOnly = false }) {
  return (
    <>
      <section className='reviews'>
        <h1 className='heading'>Comments</h1>
        <ReviewsList readOnly={readOnly} />
      </section>
    </>
  );
}
