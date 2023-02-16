import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const [btnHighlight, setBtnHighlight] = useState(false);

  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
   
  const nuberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  const buttonCls = `${classes.button} ${btnHighlight ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighlight(true);
    const timer= setTimeout(()=>{
      setBtnHighlight(false);
    },300);

    return ()=>{
      clearTimeout(timer)
    }
  }, [items]);

  return (
    <button className={buttonCls} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{nuberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
