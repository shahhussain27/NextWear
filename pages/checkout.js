import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import CircularJSON from "circular-json";
import ind from "../public/ind.webp";
import emptyCart from "../public/empty-cart.png";

const Checkout = ({ cart, addToCart, removeFromCart, subTotal, clearCart }) => {
  const [amount, setAmount] = useState(subTotal);
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({ value: null });
  // console.log(user)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: user.phone || "",
    address: user.address || "",
    state: "",
    city: "",
    pincode: user.pincode || "",
  });

  // console.log(form)
  const router = useRouter();

  useEffect(() => {
    const { phone, address, pincode, state, city } = form;
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user)
    if (user) {
      setUser(user);
    }
    setDisabled(!(phone && address && pincode && state && city));
  }, [form]);

  const getPinCode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinjson = await pins.json();
    // console.log(form.address);

    if (Object.keys(pinjson).includes(pin)) {
      setForm((prevForm) => ({
        ...prevForm,
        state: pinjson[pin][0],
      }));
      setForm((prevForm) => ({
        ...prevForm,
        city: pinjson[pin][1],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        state: "",
      }));
      setForm((prevForm) => ({
        ...prevForm,
        city: "",
      }));
    }
  };

  // console.log(user)

  // const initiatePayment = async () => {
  //   let oid = Math.floor(Math.random() * Date.now());

  //   const data = { cart, subTotal, oid, email: "admin@gmail.com" };
  //   let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   let txnRes = await a.json();
  //   console.log(txnRes);

  //   let txnToken = txnRes.txnToken;

  //   var config = {
  //     root: "",
  //     flow: "DEFAULT",
  //     data: {
  //       orderId: oid /* update order id */,
  //       token: txnToken /* update token value */,
  //       tokenType: "TXN_TOKEN",
  //       amount: subTotal /* update amount */,
  //     },
  //     handler: {
  //       notifyMerchant: function (eventName, data) {
  //         console.log("notifyMerchant handler function called");
  //         console.log("eventName => ", eventName);
  //         console.log("data => ", data);
  //       },
  //     },
  //   };

  //   window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
  //     // initialze configuration using init method
  //     window.Paytm.CheckoutJS.init(config).catch(function onError(error) {
  //       console.log("error => ", error);
  //     });
  //   });
  // };

  const createOrderId = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: CircularJSON.stringify({
            amount: amount,
            currency: "INR",
            name: form.name,
            email: user.email,
            address: form.address,
            state: form.state,
            city: form.city,
            pincode: form.pincode,
            phone: form.phone,
            products: cart,
          }),
        }
      );

      if (!response.ok) {
        // console.log(response)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data)
      return data;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  const processPayment = async (e) => {
    e.preventDefault();
    try {
      const orderData = await createOrderId();
      // console.log(orderData.order._id);
      const options = {
        key: process.env.KEY_ID,
        amount: parseFloat(100) * 100,
        currency: "INR",
        name: "NextWear",
        description: "description",
        order_id: orderData.orderId,
        handler: async function (response) {
          const data = {
            orderCreationId: orderData.orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/verify`,
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: { "Content-Type": "application/json" },
            }
          );
          const res = await result.json();
          if (res.isOk) {
            clearCart();
            router.push(`/order?id=${orderData.order._id}`);
          } else {
            alert(res.message);
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#4f46e5",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (e) => {
    if (form.pincode.length == 6) {
      getPinCode(form.pincode);
    }
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // console.log(form);

  return (
    <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      {/* Paytm */}
      {/* <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        crossorigin="anonymous"
      ></Script> */}

      {/* RazorPay */}
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">Check your items.</p>
        {Object.keys(cart).length === 0 && (
          <div className="flex flex-col item-center justify-center gap-2 mx-20">
            <Image src={emptyCart} alt="empty-cart" height={200} width={200} />
            <h2>Your NextWear Cart is empty</h2>
          </div>
        )}
        {Object.keys(cart).map((item, index) => {
          return (
            <>
              <div
                key={item}
                className="mt-2 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6"
              >
                <div className="flex flex-col items-center rounded-lg bg-white sm:flex-row">
                  <Image
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={cart[item].img}
                    alt="img"
                    height={100}
                    width={100}
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">
                      {cart[item].name}({cart[item].variant})
                    </span>
                    <span className="float-right text-gray-400">
                      <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                        {cart[item].size}
                      </p>
                    </span>
                    <p className="text-lg font-bold">₹{cart[item].price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex justify-center items-end bg-blue-600 text-white rounded-full w-6 h-6 text-lg font-semibold"
                      onClick={() => {
                        removeFromCart(item, 1);
                      }}
                    >
                      -
                    </button>
                    <h3 className="font-semibold">{cart[item].qty}</h3>
                    <button
                      className="flex justify-center items-end bg-blue-600 text-white rounded-full w-6 h-6 text-lg font-semibold"
                      onClick={() => {
                        addToCart(
                          item,
                          cart[item].qty,
                          cart[item].price,
                          cart[item].name,
                          cart[item].size,
                          cart[item].variant
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Delivery Details</p>
        <p className="text-gray-400">
          Complete your order by providing your delivery details.
        </p>
        <div className="">
          <label for="email" className="mt-4 mb-2 block text-sm font-medium">
            Email
          </label>
          {user ? (
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                value={user.email}
                readOnly
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                value={user.email}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
          )}

          <label for="name" className="mt-4 mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={user.username}
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your full name here"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
            </div>
          </div>
          <label for="phone" className="mt-4 mb-2 block text-sm font-medium">
            Phone No.
          </label>
          <div className="flex gap-2">
            <div className="relative w-7/12 flex-shrink-0">
              <input
                type="text"
                id="phone"
                name="phone"
                minLength={10}
                maxLength={10}
                onChange={handleChange}
                value={form.phone}
                className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="+91 123 456 7891"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                </svg>
              </div>
            </div>
            <input
              type="text"
              name="pincode"
              id="pincode"
              maxLength={7}
              minLength={7}
              onChange={handleChange}
              value={form.pincode}
              className="flex-shrink-0 w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="ZIP"
              required
            />
          </div>
          <label for="address" className="mt-4 mb-2 block text-sm font-medium">
            Billing Address
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-shrink-0 sm:w-7/12">
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
                value={form.address}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Street Address"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <Image
                  className="h-4 w-4 object-contain"
                  src={ind}
                  alt="india"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />

            <input
              type="text"
              name="city"
              id="city"
              onChange={handleChange}
              value={form.city}
              className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="City"
              required
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">₹{subTotal}</p>
          </div>
        </div>
        <button // onClick={initiatePayment}
          onClick={processPayment}
          disabled={disabled}
          className="mt-4 mb-8 w-full rounded-md disabled:bg-blue-400 bg-blue-600 hover:bg-blue-700 px-6 py-3 font-medium text-white"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
