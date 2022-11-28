import React from 'react';
import PackagesList from '../../components/packages/PackagesList';
import './packages.scss';

export default function Packages({ readOnly = false }) {
  return (
    <section className='packages'>
      <h1 className='heading'>Popular packages</h1>
      <div className='box-container'>
        <PackagesList readOnly={readOnly} />
      </div>
    </section>
  );
}
