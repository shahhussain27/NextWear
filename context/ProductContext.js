import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { set } from "mongoose";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [tshirt, setTshirt] = useState([]);
  const [hoodies, setHoodies] = useState([]);
  const [mugs, setMugs] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [orders, setOrders] = useState([]);

  const router = useRouter();

  const notify = (message, type) => {
    toast[type](message);
  };

  const signup = async (username, email, password) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      if (json.token) {
        notify("User Login Successfull", "success");
        localStorage.setItem("token", json.token);
        localStorage.setItem("user", JSON.stringify(json.user));
        // console.log(json.user)
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getProducts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/myorders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      // console.log(json)
      setOrders(json.orders);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelOrder = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/cancelorder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      if (json.status === "success") {
        notify("Order Deleted Successfully", "success");
        const newOrders = orders.filter((order) => {
          return order._id !== id;
        });
        setOrders(newOrders);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(user)

  useEffect(() => {
    fetchProduct();
    fetchOrders();
  }, []);
  return (
    <ProductContext.Provider
      value={{
        signup,
        login,
        tshirt,
        hoodies,
        mugs,
        stickers,
        orders,
        cancelOrder,
        
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
