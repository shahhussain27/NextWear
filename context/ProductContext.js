import React, { createContext, useState, useEffect } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://next-wear.vercel.app/api/getProducts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      // console.log(json.tshirts)
      setProduct(json.tshirts);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <ProductContext.Provider value={{ product }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
