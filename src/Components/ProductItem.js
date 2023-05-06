import React, { useContext } from "react";
import { Link } from "react-router-dom";
import productContext from "../Context/products/productContext";
import cartContext from "../Context/carts/cartContext";

const ProductItem = ({ product }) => {
  const contextCart = useContext(cartContext);
  const { addProduct } = contextCart;

  const context = useContext(productContext);
  const { update, products } = context;
  const { title, description, oldPrice, price, url } = product;

  const moreAboutProduct = () => {
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      if (element._id === product._id) {
        update(index);
        break;
      }
    }
  };

  const quantity = 1;

  return (
    <div className="flex flex-col md:w-[35vh] bg-[#3C1053FF] border-white border-[0.25px] w-[50vw]">
      <Link to="/item">
        <div className="flex flex-col" onClick={moreAboutProduct}>
          <img className="md:w-[35vh] h-[35vh] w-[50vw]" src={url[0]} alt="" />
          <div className="p-[1vw]">
            <p>{title}</p>
            <p className="text overflow-hidden whitespace-nowrap text-ellipsis text-gray-400">
              {description}
            </p>
            <div className="flex gap-2">
              <p className="text-gray-400 line-through">{oldPrice}</p>
              <p>
                <i className="fa-solid fa-indian-rupee-sign"></i> {price}
              </p>
              <p className="text-green-500">
                {parseInt(((oldPrice - price) * 100) / oldPrice)}% off
              </p>
            </div>
          </div>
        </div>
      </Link>
      <button
        className="bg-[#3C1053FF] pb-[1vh]"
        onClick={() => {
          addProduct(product._id, quantity);
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductItem;
