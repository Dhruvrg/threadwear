import { useState } from "react";
import ProductContext from "./productContext";

const ProductState = (props) => {
  const host = "http://localhost:8000";
  const productsInitial = [];
  const [products, setProducts] = useState(productsInitial);

  // //Get all products
  const getProducts = async () => {
    const response = await fetch(`${host}/api/products/fetchallproducts`, {
      method: "GET",
    });
    const json = await response.json();
    setProducts(json);
  };

  //Edit a Product
  const editProduct = async (id, star) => {
    const response = await fetch(`${host}/api/products/updateproduct/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ star }),
    });
    const json = await response.json();

    let newProducts = JSON.parse(JSON.stringify(products));
    for (let index = 0; index < newProducts.length; index++) {
      const element = newProducts[index];
      if (element._id === id) {
        newProducts[index].star = star;
        break;
      }
    }
    setProducts(newProducts);
  };

  const [state, setState] = useState(products[0]);

  const update = (idx) => {
    setState(products[idx]);
  };

  return (
    <ProductContext.Provider
      value={{ products, getProducts, editProduct, state, update }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductState;
