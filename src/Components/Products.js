import React, { useContext, useEffect } from "react";
import productContext from "../Context/products/productContext";
import ProductItem from "./ProductItem";

const Products = () => {
  const context = useContext(productContext);
  const { products, getProducts } = context;

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-[#DF6589FF] md:px-[5vw] md:py-[5vh] ">
      <div className=" font-bold text-center py-[5vh] text-3xl">
        ThreadWear - If You Like It Don't Think Order It
      </div>
      <div className="flex flex-wrap md:gap-[2.5vw] justify-between text-white">
        {products && products.length > 0
          ? products.map((product) => {
              return <ProductItem key={product._id} product={product} />;
            })
          : null}
      </div>
    </div>
  );
};

export default Products;
