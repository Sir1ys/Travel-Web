import React from "react";
import { useDispatch } from "react-redux";
import { orderIsDone } from "../../store/slices/orderSlice/orderSlice";
import "./modal.scss";

export default function Modal({ active, setActive, children}) {

  const dispatch = useDispatch();

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => {
        setActive(false);
        dispatch(orderIsDone(false));
      }}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
