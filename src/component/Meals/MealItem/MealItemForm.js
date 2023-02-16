import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [amountValidity, setAmountValidity] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    console.log('hello')
    const enteredAmount = amountInputRef.current.value;
    console.log(typeof(enteredAmount));
    const enteredAmountNum = +enteredAmount;
    console.log(typeof(enteredAmountNum));
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum > 5 ||
      enteredAmountNum < 1
    ) {
      setAmountValidity(false);
      return;
    }
    props.onAddToCart(enteredAmountNum);
  };

  const amountInputRef = useRef(null);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button> +Add </button>
      {!amountValidity && <p>Plaese enter valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
