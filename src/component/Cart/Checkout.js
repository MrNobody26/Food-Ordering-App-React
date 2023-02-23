import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const isEmpty = (value) => {
    return value.trim() === "";
  };
  const isPostal = (value) => {
    return value.trim().length === 6;
  };

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    
    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalIsValid = isPostal(enteredPostal);
    const cityIsValid = !isEmpty(enteredCity);
    
    
    
    setFormInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });
    
    const formIsValid =
    nameIsValid && streetIsValid && postalIsValid && cityIsValid;
    
    const userData={
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    }
        if(!formIsValid){
          return;
        }else{
          props.onAddOrder(userData);
        }
  };

  const nameClass = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetClass = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const cityClass = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;
  const postalClass = `${classes.control} ${
    formInputValidity.postal ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please Enter Valid Name</p>}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please Enter Valid street</p>}
      </div>
      <div className={postalClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && <p>Please Enter Valid postal</p>}
      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please Enter Valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
