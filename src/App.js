import React, { useState } from "react";
import Header from "./component/Layout/Header";
import Footer from "./component/Meals/MealItem/Footer";
import Meals from "./component/Meals/Meals";
import Cart from "./component/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setCartShow] = useState(false);

  const showCartHandler = () => {
    setCartShow(true);
  };
  const hideCartHandler = () => {
    setCartShow(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
