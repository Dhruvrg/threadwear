import { useState } from "react";
import CartContext from "./cartContext";

const CartState = (props) => {
  const host = "http://localhost:8000";
  const cartInitial = [];
  const [cart, setCart] = useState(cartInitial);

  // Add a product
  const addProduct = async (id, quantity) => {
    const response = await fetch(`${host}/api/cart/addtocart/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ quantity }),
    });
    const product = await response.json();
    setCart(cart.concat(product));
  };

  // //Get all products
  const getCart = async () => {
    const response = await fetch(`${host}/api/cart/fetchallproductsfromcart`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setCart(json);
  };

  //   //Edit a Product
  const editCart = async (id, quantity) => {
    const response = await fetch(`${host}/api/cart/updatecart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ quantity }),
    });
    const json = await response.json();

    let newCart = JSON.parse(JSON.stringify(cart));
    for (let index = 0; index < newCart.length; index++) {
      const element = newCart[index];
      if (element._id === id) {
        newCart[index].quantity = quantity;
        break;
      }
    }
    setCart(newCart);
  };

  const removeProduct = async (id) => {
    const response = await fetch(`${host}/api/cart/deletefromcart/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    const newCart = cart.filter((product) => product._id !== id);
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, getCart, editCart, removeProduct, addProduct }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartState;
