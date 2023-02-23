import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const hasItem = cartCtx.items.length > 0;
  const orderHandler = () => {
    setShowCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-01-c929c-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orders: cartCtx.items,
        }),
      }
    );

    setIsSubmitting(false);
    setOrderConfirmed(true);
  };

  const totalAmount = `💲${cartCtx.totalAmount.toFixed(2)}`;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModelContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onAddOrder={submitOrderHandler} onCancel={props.onHideCart} />
      )}
      {!showCheckout && modalActions}
    </React.Fragment>
  );

  const SubmitngContent = <p>Sending your order data...</p>;

  const didSubmitngContent = (
    <React.Fragment>
      <p>Order Data sennt successfullt sent!👍</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {!isSubmitting && !orderConfirmed && cartModelContent}
      {isSubmitting && SubmitngContent}
      {!isSubmitting && orderConfirmed && didSubmitngContent}
    </Modal>
  );
};

export default Cart;
