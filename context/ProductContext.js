import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [tshirt, setTshirt] = useState([]);
  const [hoodies, setHoodies] = useState([]);
  const [mugs, setMugs] = useState([]);
  const [stickers, setStickers] = useState([]);

  const router = useRouter();

  const notify = (message, type) => {
    toast[type](message);
  };

  const signup = async (username, email, password) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      // console.log(json.success === "success");
      if (json.success === "success") {
        notify("User Signup Successfull", "success");
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      if (json.token) {
        notify("User Login Successfull", "success");
        localStorage.setItem("token", json.token);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getProducts`, {
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
      setTshirt(json.tshirts);
      setHoodies(json.hoodies);
      setMugs(json.mugs);
      setStickers(json.stickers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <ProductContext.Provider
      value={{ signup, login, tshirt, hoodies, mugs, stickers }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
