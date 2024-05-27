import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Order from "@/models/Order";

const MyOrder = ({ order }) => {
  // console.log(order)
  return (
    <section className="text-gray-600 body-font overflow-hidden">
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

            <div className="flex mt-4">
              <span className="title-font font-medium text-2xl text-gray-900">
                SubTotal: ₹{order.amount}
              </span>
              {order.status === "Paid" && (
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Track Order
                </button>
              )}
              {order.status === "Pending" && (
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
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
