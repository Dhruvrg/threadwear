import React, { useContext, useState } from "react";
import productContext from "../Context/products/productContext";
import ProductItem from "./ProductItem";

const Item = () => {
  const context = useContext(productContext);
  const { state, products } = context;
  const { title, description, oldPrice, price, url, size, star } = state;
  const [imgState, setImgState] = useState(0);

  let sum = 0;
  let totalStar = 0;
  for (let idx = 0; idx < 5; idx++) {
    totalStar += parseFloat(star[idx]) * (idx + 1);
    sum += parseFloat(star[idx]);
  }
  totalStar = parseInt(totalStar / sum) + 1;

  const [starClass, setStarClass] = useState(["", "", "", "", ""]);

  return (
    <>
      <div className="flex flex-col md:flex-row bg-[#DF6589FF] justify-evenly md:pt-[15vh] md:pb-[5vh] pt-[7.5vh]">
        <div className="flex-col">
          <img
            src={url[imgState]}
            alt=""
            className="md:w-[42.5vw] md:h-[50vw] md:rounded-xl w-[100vw] h-[40vh]"
          />
          <div className="flex justify-center md:mt-[5vh] gap-2 m-[1vh]">
            {url.map((u, i) => (
              <img
                onClick={() => {
                  setImgState(i);
                }}
                key={i}
                src={u}
                alt=""
                className="md:h-[17.5vh] md:w-[17.5vh] rounded-md h-[20vw] w-[25vw]"
              />
            ))}
          </div>
        </div>
        <div className="md:w-[42.5vw] md:h-[50vw] bg-[#E1D9D1] md:rounded-xl p-[5vw]">
          <div>
            <p className="font-bold text-xl md:text-3xl">{title}</p>
            <p className="md:text-2xl">{description}</p>
            <div className="flex gap-5 md:my-[2.5vh]">
              <p className="text-gray-500 line-through md:text-3xl text-xl">
                {oldPrice}
              </p>
              <p className="md:text-3xl text-xl">
                <i className="fa-solid fa-indian-rupee-sign"></i> {price}
              </p>
              <p className="text-green-500 md:text-3xl text-xl">
                {parseInt(((oldPrice - price) * 100) / oldPrice)}% off
              </p>
            </div>
            <div className="font-bold md:text-2xl">{totalStar} ⭐</div>
          </div>
          <div className="font-bold md:text-2xl text-gray-600 md:mt-[2.5vh]">
            Sizes
          </div>
          <div className="flex gap-10">
            {size.map((s, i) => (
              <p key={i}>{s}</p>
            ))}
          </div>
          <div className="font-bold md:text-xl text-gray-600 md:mt-[2.5vh]">
            Rating
          </div>
          <div>
            <div>{star[0]} ⭐</div>
            <div>{star[1]} ⭐⭐</div>
            <div>{star[2]} ⭐⭐⭐</div>
            <div>{star[3]} ⭐⭐⭐⭐</div>
            <div>{star[4]} ⭐⭐⭐⭐⭐</div>
          </div>
          <div className="my-[5vh]">
            <a
              className="bg-[#3C1053FF] text-white w-[10vw] rounded-xl text-xl px-3 py-1"
              href="upi://pay?pa=7709468189@hdfcbank&pn=DHRUV GHARAT&cu=INR"
              id="__UPI_BUTTON__"
            >
              BUY NOW
            </a>
          </div>
          <div>
            <div>
              <p>Rate this product</p>
              <i
                onClick={() => setStarClass(["fa-solid", "", "", "", ""])}
                className={`${starClass[0]} fa-regular fa-star`}
              ></i>
              <i
                onClick={() =>
                  setStarClass(["fa-solid", "fa-solid", "", "", ""])
                }
                className={`${starClass[1]} fa-regular fa-star`}
              ></i>
              <i
                onClick={() =>
                  setStarClass(["fa-solid", "fa-solid", "fa-solid", "", ""])
                }
                className={`${starClass[2]} fa-regular fa-star`}
              ></i>
              <i
                onClick={() =>
                  setStarClass([
                    "fa-solid",
                    "fa-solid",
                    "fa-solid",
                    "fa-solid",
                    "",
                  ])
                }
                className={`${starClass[3]} fa-regular fa-star`}
              ></i>
              <i
                onClick={() =>
                  setStarClass([
                    "fa-solid",
                    "fa-solid",
                    "fa-solid",
                    "fa-solid",
                    "fa-solid",
                  ])
                }
                className={`${starClass[4]} fa-regular fa-star`}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="flex overflow-x-scroll text-white">
        {products && products.length > 0
          ? products.map((product) => {
              return <ProductItem key={product._id} product={product} />;
            })
          : null}
      </div>
    </>
  );
};

export default Item;
