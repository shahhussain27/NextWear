import React, { useContext } from "react";
import Image from "next/image";
import { ProductContext } from "@/context/ProductContext";
import Link from "next/link";
import emptyOrders from "../public/empty-orders.png";

const Orders = () => {
  const { orders, cancelOrder } = useContext(ProductContext);

  const formateDate = (date) => {
    const formattedDate = new Date(date)
      .toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .split("T")[0];
    return formattedDate;
  };

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center mb-4">
          Your Orders
        </h2>

        {Object.keys(orders).length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <Image
              src={emptyOrders}
              alt="empty-orders"
              height={300}
              width={300}
            />
            <h2>Your Order is empty</h2>
          </div>
        )}
        {orders &&
          Object.keys(orders).map(
            (item, index) =>
              orders[item] && (
                <div
                  key={index}
                  className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full mb-2"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                    <div className="data">
                      <p className="flex gap-2 font-semibold text-base leading-7 text-black">
                        Order Id:
                        <Link
                          href={`/order?id=${orders[item]._id}`}
                          className="text-indigo-600 font-medium"
                        >
                          #{orders[item].orderId}
                        </Link>
                      </p>
                      <p className="flex gap-2 font-semibold text-base leading-7 text-black mt-4">
                        Order Placed On :
                        <span className="text-gray-400 font-medium ">
                          {formateDate(orders[item].createdAt)}
                        </span>
                      </p>
                    </div>
                    {orders[item].status === "Paid" && (
                      <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                        Track Your Order
                      </button>
                    )}
                    {orders[item].status === "Pending" && (
                      <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                        Pay again
                      </button>
                    )}
                  </div>
                  {orders[item].products &&
                    Object.values(orders[item].products).map(
                      (product, productIndex) => (
                        <div key={productIndex} className="w-full px-3">
                          <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                            <div className="img-box max-lg:w-full">
                              <Image
                                src={product.img}
                                alt="Premium Watch image"
                                className=" w-full"
                                height={100}
                                width={100}
                              />
                            </div>
                            <div className="flex flex-row items-center w-full ">
                              <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                <div className="flex items-center">
                                  <div>
                                    <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                      {product.name}
                                    </h2>
                                    <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                      NextWear
                                    </p>
                                    <div className="flex items-center ">
                                      <p className="flex gap-2 font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                        Size:
                                        <span className="text-gray-500">
                                          {product.size}
                                        </span>
                                      </p>
                                      <p className="flex gap-2 font-medium text-base leading-7 text-black ">
                                        Qty:
                                        <span className="text-gray-500">
                                          {product.qty}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-5">
                                  <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                    <div className="flex gap-3 lg:block">
                                      <p className="font-medium text-sm leading-7 text-black">
                                        Price
                                      </p>
                                      <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                        ₹{product.price}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                    <div className="flex gap-3 lg:block">
                                      <p className="font-medium text-sm leading-7 text-black">
                                        Status
                                      </p>
                                      <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                        {orders[item].status}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                    <div className="flex gap-3 lg:block">
                                      <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                        Expected Delivery Time
                                      </p>
                                      <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                        None
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  <div className="w-full px-6 flex flex-col lg:flex-row items-center justify-between">
                    <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                      <button
                        onClick={() => {
                          cancelOrder(orders[item]._id);
                        }}
                        className="flex outline-0 py-6 sm:pr-6 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600"
                      >
                        <svg
                          className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                            stroke=""
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                        Cancel Order
                      </button>
                    </div>
                    <p className="font-semibold text-lg text-black py-6">
                      Total Price:{" "}
                      <span className="text-indigo-600">
                        {" "}
                        ₹{orders[item].amount}
                      </span>
                    </p>
                  </div>
                </div>
              )
          )}
      </div>
    </section>
  );
};

export default Orders;