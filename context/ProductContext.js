import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [tshirt, setTshirt] = useState([]);
  const [hoodies, setHoodies] = useState([]);
  const [mugs, setMugs] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [myorders, setMyOrders] = useState([]);
  const [results, setResults] = useState([]);

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
        notify("Welcome To NextWear", "success");
        localStorage.setItem("token", json.token);
        localStorage.setItem("user", JSON.stringify(json.user));
        // console.log(json.user)
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const profile = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: localStorage.getItem("token") }),
        }
      );

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      // console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async (name, phone, address, pincode) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            name: name,
            phone: phone,
            address: address,
            pincode: pincode,
          }),
        }
      );

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      // console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePassword = async (password, cpassword, npassword) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            password: password,
            cpassword: cpassword,
            npassword: npassword,
          }),
        }
      );

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      if (json.success) {
        notify("Your Password Has Been Change", "success");
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
      setMyOrders(json.myorders);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(myorders)

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
        notify("Order Cancel Successfull", "success");
        // const newOrders = orders.filter((order) => {
        //   return order._id !== id;
        // });
        // setOrders(newOrders);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addProducts = async (
    img,
    title,
    slug,
    category,
    size,
    color,
    desc,
    price,
    availableQty
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/addProducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            img: img,
            title: title,
            slug: slug,
            category: category,
            size: size,
            color: color,
            desc: desc,
            price: price,
            availableQty: availableQty,
          }),
        }
      );

      if (!response.ok) {
        notify(`${response.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      if (json.success) {
        notify("Product Added", "success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchResults = async (query) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/search?query=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const searchData = await response.json();
      setResults(searchData);
      return searchData;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchOrders();
  }, []);
  return (
    <ProductContext.Provider
      value={{
        signup,
        login,
        profile,
        updateProfile,
        updatePassword,
        tshirt,
        hoodies,
        mugs,
        stickers,
        orders,
        myorders,
        cancelOrder,
        addProducts,
        searchResults,
        results,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
