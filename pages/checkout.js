import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import CircularJSON from "circular-json";

const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const [amount, setAmount] = useState(subTotal);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
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
            email: form.email,
            address: form.address,
            products: cart,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };
  const processPayment = async (e) => {
    e.preventDefault();
    try {
      const orderId = await createOrderId();
      const options = {
        key: process.env.KEY_ID,
        amount: parseFloat(100) * 100,
        currency: "INR",
        name: "NextWear",
        description: "description",
        order_id: orderId,
        handler: async function (response) {
          const data = {
            orderCreationId: orderId,
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
          if (res.isOk) router.push("/order");
          else {
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
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  useEffect(() => {
    const { name, email, phone, address } = form;
    setDisabled(!(name && email && phone && address));
  }, [form]);

  return (
    <div className="container m-auto">
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
      <h1 className="font-bold text-xl my-8 text-center">Checkout</h1>
      <h2 className="font-bold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex flex-wrap my-4 mb-4">
        <div className="px-2 w-1/2">
          <div clssName="flex gap-2 mb-4">
            <label for="name" clssName="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              onChange={handleChange}
              className="border-2 border-blue-600 rounded py-1 px-2 text-lg w-full"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div clssName="flex gap-2 mb-4">
            <label for="email" clssName="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              className="border-2 border-blue-600 rounded py-1 px-2 text-lg w-full"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div clssName="flex gap-2 mb-4">
            <label for="phone" clssName="leading-7 text-sm text-gray-600">
              Phone No.
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              onChange={handleChange}
              className="border-2 border-blue-600 rounded py-1 px-2 text-lg w-full"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div clssName="flex gap-2 mb-4">
            <label for="address" clssName="leading-7 text-sm text-gray-600">
              Address
            </label>
            <textarea
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
              className="border-2 border-blue-600 rounded py-1 px-2 text-lg w-full"
            />
          </div>
        </div>
      </div>
      <h2 className="font-bold text-xl">2. Review Cart Items</h2>
      <div className="mx-auto flex flex-col my-4 mb-4">
        {Object.keys(cart).length === 0 && (
          <div className="mb-4">No item in the cart</div>
        )}
        {Object.keys(cart).map((item, index) => {
          return (
            <>
              <div className="flex justify-between items-center mb-4">
                <div
                  key={item}
                  className="flex gap-2 items-center font-semibold"
                >
                  <Image
                    src="https://m.media-amazon.com/images/I/71EcAtglToL._SY741_.jpg"
                    width={70}
                    height={70}
                  />
                  <h3>{cart[item].name}</h3>
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
            </>
          );
        })}
      </div>

      <button
        // onClick={initiatePayment}
        onClick={processPayment}
        disabled={disabled}
        className="disabled:bg-blue-400 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-2 rounded-md"
      >
        Pay ₹{subTotal}
      </button>
    </div>
  );
};

export default Checkout;
