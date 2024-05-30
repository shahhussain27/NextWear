import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Order from "@/models/Order";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";

const MyOrder = ({ order }) => {

  // console.log(order)
  
  const router = useRouter();
  const processPayment = async (e) => {
    e.preventDefault();
    try {
      // console.log(orderData.order._id);
      const options = {
        key: process.env.KEY_ID,
        amount: parseFloat(100) * 100,
        currency: "INR",
        name: "NextWear",
        description: "description",
        order_id: order.orderId,
        handler: async function (response) {
          // console.log(response)
          const data = {
            orderCreationId: order.orderId,
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
            router.push(`/`);
          } else {
            alert(res.message);
          }
        },
        prefill: {
          name: name,
          email: order.email,
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
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      {/* RazorPay */}
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              NEXTWEAR
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order Id: #{order.orderId}
            </h1>
            {order.status === "Paid" && (
              <p className="leading-relaxed mb-4">
                Your order has been successfully placed
              </p>
            )}
            {order.status === "Pending" && (
              <p className="leading-relaxed mb-4">
                Your order is pending due to a payment error, please review your
                details and pay again.
              </p>
            )}

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(order.products).map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {item.qty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      ₹{item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      ₹{item.price * item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <span className="title-font font-medium text-2xl text-gray-900">
                SubTotal: ₹{order.amount}
              </span>
              {order.status === "Paid" && (
                <Link href={`/track/orderTrack?id=${order._id}`}>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Track Order
                  </button>
                </Link>
              )}
              {order.status === "Pending" && (
                <button
                  onClick={processPayment}
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Pay again
                </button>
              )}
            </div>
          </div>
          <Image
            alt="ecommerce"
            className="lg:w-2/6 lg:h-auto w-full h-34 object-cover object-center rounded"
            src="https://m.media-amazon.com/images/I/71EcAtglToL._SY741_.jpg"
            height={70}
            width={70}
          />
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default MyOrder;
