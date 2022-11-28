import React from "react";
import { useSelector } from "react-redux";
import Button from "../UI/Button/Button";
import "./cart.scss";
import CartItem from "./cartItem/CartItem";
import { useNavigate } from "react-router-dom";

export default function Cart({ setActive }) {
  const navigate = useNavigate();
  const order = useSelector((state) => state.order.order);

  return (
    <div className="cart">
      {order.length !== 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.map((item) => {
                return <CartItem key={item.id} {...item} />;
              })}
            </tbody>
          </table>
          <div className="total-price">
            Total:{" "}
            {order.reduce(
              (sum, current) => sum + current.quantity * current.price,
              0
            )}
            $
          </div>
          <div style={{ display: "flex", alignSelf: "flex-end" }}>
            <Button
              success={true}
              onClick={() => {
                navigate("/payment");
                setActive(false);
              }}
            >
              Buy
            </Button>
          </div>
        </>
      ) : (
        <h2>You cart is empty!</h2>
      )}
    </div>
  );
}
