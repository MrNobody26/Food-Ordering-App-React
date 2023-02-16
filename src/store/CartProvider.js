import CartContext from "./cart-context";
import React, { useReducer } from "react";

const defaulCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
   
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const exsistingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    

    const exsistingItem = state.items[exsistingItemIndex];
    let updatedItems;

    if (exsistingItem) {
      console.log("inside if condition for exsisting one");
      const updatedItem = {
        ...exsistingItem,
        amount: exsistingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[exsistingItemIndex] = updatedItem;
    
    } else {
      updatedItems = state.items.concat(action.item);
    }
   
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const exsistingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    console.log(exsistingItemIndex, ":index");
    console.log("whole items list : ", state.items);
    console.log("total amount",state.totalAmount);

      const exsistingItem= state.items[exsistingItemIndex];
      console.log("exsisting item",exsistingItem)
      const updatedTotalAmount=state.totalAmount-exsistingItem.price;
      let updatedItems;
      if(exsistingItem.amount===1){
        updatedItems=state.items.filter(item=>item.id!==action.id)
      }else{
        const updatedItem={...exsistingItem, amount:exsistingItem.amount-1}
        updatedItems=[...state.items];
        updatedItems[exsistingItemIndex]=updatedItem;
      }

      return{
        items:updatedItems,
        totalAmount:updatedTotalAmount,
      }

  }

  return defaulCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaulCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const deleteItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: deleteItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
