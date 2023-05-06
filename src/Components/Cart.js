import React, { useContext, useEffect } from "react";
import cartContext from "../Context/carts/cartContext";
import CartItem from "./CartItem";
import productContext from "../Context/products/productContext";

const Cart = () => {
  const contextCart = useContext(cartContext);
  const { cart, getCart } = contextCart;

  const contextProduct = useContext(productContext);
  const { products } = contextProduct;

  useEffect(() => {
    getCart();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="bg-[#DF6589FF] py-[7.5vw] md:px-[2.5vw] flex flex-col md:flex-row flex-wrap md:justify-evenly md:gap-y-[2.5vh] min-h-[100vh]">
        {cart && cart.length > 0
          ? cart.map((product) => {
              for (let index = 0; index < products.length; index++) {
                const element = products[index];
                if (element._id === product.productId) {
                  return (
                    <CartItem
                      eodId={product._id}
                      key={product._id}
                      quantity={product.quantity}
                      element={element}
                    />
                  );
                }
              }
            })
          : null}
      </div>
    </>
  );
};

export default Cart;
