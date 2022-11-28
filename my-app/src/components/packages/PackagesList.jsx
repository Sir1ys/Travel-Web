import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../store/slices/orderSlice/orderSlice';
import CreatePackage from './createPackage/CreatePackage';
import Package from './package/Package';

export default function PackageList({readOnly = false}) {
  const packages = useSelector((state) => state.packages.packages);

  const addToBasket = (event) => {
    dispatch(addOrder(event));
  };

  const dispatch = useDispatch();

  return readOnly === false ? (
    <>
      <CreatePackage />
      {packages.map((item) => (
        <Package
          key={item.id}
          data={item}
          readOnly={readOnly}
          addToBasket={addToBasket}
        />
      ))}
    </>
  ) : (
    <>
      {packages.slice(0, 3).map((item) => (
        <Package key={item.id} data={item} readOnly={readOnly}/>
      ))}
    </>
  );
}
