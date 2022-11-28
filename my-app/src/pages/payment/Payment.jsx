import React, { useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import "./payment.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearOrder,
  orderIsDone,
} from "../../store/slices/orderSlice/orderSlice";

export default function Payment() {
  const order = useSelector((state) => state.order.order);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [values, setValues] = useState({
    card: "",
    holder: "",
    cvv: "",
    month: "",
    year: "",
  });

  const onChange = (e, number) => {
    number
      ? setValues({
          ...values,
          [e.target.name]: e.target.value.slice(0, number),
        })
      : setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setValues({
      card: "",
      holder: "",
      cvv: "",
      month: "",
      year: "",
    });
  };

  const handlePay = () => {
    if (
      values.card !== "" &&
      values.cvv !== "" &&
      values.holder !== "" &&
      values.month !== "" &&
      values.year !== ""
    ) {
      handleClear();
      dispatch(clearOrder());
      dispatch(orderIsDone(true));
      navigate("/");
    }
  };

  return (
    <section className="payment">
      <div className="wrapper">
        <div className="left">
          <form
            action=""
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="card-number">
              <div className="text">
                <p>Card Number</p>
                <span>Enter the 16-digit card number on the card</span>
              </div>
              <Input
                type="text"
                id="credit-card"
                name="card"
                placeholder="XXXX - XXXX - XXXX - XXXX"
                value={values.card}
                onChange={(e) => onChange(e, 16)}
                required
                pattern={
                  "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$"
                }
                errorMessage={"Vrite a valid card number"}
                autoComplete="off"
              />
            </div>
            <div className="card-holder">
              <div className="text">
                <p>Card Holder Name</p>
                <span>Enter card holder name</span>
              </div>
              <Input
                type="text"
                id="credit-name"
                name="holder"
                placeholder="Enter a card holder name"
                value={values.holder}
                onChange={onChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="card-cvv">
              <div className="text">
                <p>CVV Number</p>
                <span>Enter CVV code</span>
              </div>
              <Input
                type="text"
                id="credit-cvv"
                name="cvv"
                placeholder="Enter CVV code"
                value={values.cvv}
                onChange={(e) => onChange(e, 3)}
                required
                pattern={"[0-9][0-9][0-9]"}
                errorMessage={"Write a valid CVV code"}
                autoComplete="off"
              />
            </div>
            <div className="card-expiration">
              <div className="text">
                <p>Expiry Date</p>
                <span>Enter the experation date</span>
              </div>
              <div>
                <Input
                  type="text"
                  id="exp-month"
                  name="month"
                  placeholder="MM"
                  value={values.month}
                  onChange={(e) => onChange(e, 2)}
                  required
                  pattern={"[0-1][0-9]"}
                  errorMessage={"Write a valid month"}
                  autoComplete="off"
                />
                <strong>/</strong>
                <Input
                  type="text"
                  id="exp-year"
                  name="year"
                  placeholder="YY"
                  value={values.year}
                  onChange={(e) => onChange(e, 2)}
                  required
                  pattern="[1-3][0-9]"
                  errorMessage={"Write a valid year"}
                  autoComplete="off"
                />
              </div>
            </div>
            <Button success={true} onClick={handlePay}>
              Pay now
            </Button>
          </form>
        </div>
        <div className="right">
          <div className="card-virtual">
            <p className="logo"></p>
            <p className="name">
              {values.holder !== "" ? values.holder : "John Doe"}
            </p>
            <p className="chip">
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 511 511"
                style={{ enableBackground: "new 0 0 511 511" }}
                xmlSpace="preserve"
              >
                <path
                  d="M455.5,56h-400C24.897,56,0,80.897,0,111.5v288C0,430.103,24.897,455,55.5,455h400c30.603,0,55.5-24.897,55.5-55.5v-288
	C511,80.897,486.103,56,455.5,56z M464,248H343v-56.5c0-4.687,3.813-8.5,8.5-8.5H464V248z M343,263h121v65H343V263z M479,223h17v65
	h-17V223z M479,208v-65h17v65H479z M464,168H351.5c-12.958,0-23.5,10.542-23.5,23.5V408H183V103h272.5c4.687,0,8.5,3.813,8.5,8.5
	V168z M168,248H47v-65h121V248z M32,288H15v-65h17V288z M47,263h121v65H47V263z M263,88V71h137v17H263z M248,88H111V71h137V88z
	 M168,103v65H47v-56.5c0-4.687,3.813-8.5,8.5-8.5H168z M32,208H15v-65h17V208z M15,303h17v65H15V303z M47,343h121v65H55.5
	c-4.687,0-8.5-3.813-8.5-8.5V343z M248,423v17H111v-17H248z M263,423h137v17H263V423z M343,408v-65h121v56.5
	c0,4.687-3.813,8.5-8.5,8.5H343z M479,303h17v65h-17V303z M496,111.5V128h-17v-16.5c0-12.958-10.542-23.5-23.5-23.5H415V71h40.5
	C477.832,71,496,89.168,496,111.5z M55.5,71H96v17H55.5C42.542,88,32,98.542,32,111.5V128H15v-16.5C15,89.168,33.168,71,55.5,71z
	 M15,399.5V383h17v16.5c0,12.958,10.542,23.5,23.5,23.5H96v17H55.5C33.168,440,15,421.832,15,399.5z M455.5,440H415v-17h40.5
	c12.958,0,23.5-10.542,23.5-23.5V383h17v16.5C496,421.832,477.832,440,455.5,440z"
                />
              </svg>
            </p>
            <p className="highlight">
              <span className="last-digit" id="card-number">
                {values.card !== ""
                  ? values.card
                  : ".... .... .... 4567"}
              </span>
              <span className="expiry">
                <span className="exp-month">
                  {values.month !== "" ? values.month : "11"}
                </span>
                <span>/</span>
                <span className="exp-year">
                  {values.year !== "" ? values.year : "25"}
                </span>
              </span>
            </p>
          </div>
          <div className="receipt">
            <ul>
              <li>
                <span>Vat (20%)</span>
                <span>
                  {0.2 *
                    order.reduce(
                      (sum, current) => sum + current.quantity * current.price,
                      0
                    )}{" "}
                  $
                </span>
              </li>
            </ul>
            <div className="total">
              <p className="price">
                <strong>
                  {order.reduce(
                    (sum, current) => sum + current.quantity * current.price,
                    0
                  )}
                </strong>{" "}
                USD
              </p>
              <p>Total amount you have to pay</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
