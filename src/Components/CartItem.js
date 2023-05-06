import React, { useContext, useState } from "react";
import cartContext from "../Context/carts/cartContext";

const CartItem = ({ element, quantity, eodId }) => {
  const contextCart = useContext(cartContext);
  const { editCart, removeProduct } = contextCart;

  const { title, description, oldPrice, price, url, size, star } = element;
  const [units, setUnits] = useState(quantity);
  const [editOrSave, setEditOrSave] = useState("");

  let sum = 0;
  let totalStar = 0;
  for (let idx = 0; idx < 5; idx++) {
    totalStar += parseFloat(star[idx]) * (idx + 1);
    sum += parseFloat(star[idx]);
  }
  totalStar = parseInt(totalStar / sum) + 1;

  return (
    <div className="flex md:w-[40vw] h-[35vh] w-[100vw]">
      <div>
        <img src={url[0]} alt="" className="md:w-[15vw] h-[35vh] w-[50vw]" />
      </div>
      <div className="bg-[#3C1053FF] text-white md:w-[25vw] px-[1vw] flex flex-col justify-center w-[50vw]">
        <div>
          <p className="font-bold md:text-xl">{title}</p>
          <p>{description}</p>
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

        <div className="font-bold md:text-xl">{totalStar}⭐</div>
        <div className="flex gap-[1vw]">
          <button
            onClick={() => {
              setUnits(units + 1);
              setEditOrSave("Save");
            }}
          >
            +
          </button>
          <h4>{units}</h4>
          <button
            onClick={() => {
              if (units > 1) {
                setUnits(units - 1);
              }
              setEditOrSave("Save");
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              editCart(eodId, units);
              setEditOrSave("");
            }}
          >
            {editOrSave}
          </button>
        </div>
        <div className=" text-gray-400">Sizes</div>
        <div className="flex gap-[1.5vw]">
          {size.map((s, i) => (
            <p key={i}>{s}</p>
          ))}
        </div>
        <button
          onClick={() => {
            removeProduct(eodId);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;
