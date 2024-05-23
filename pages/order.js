import React from "react";
import Image from "next/image";

const Order = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              NEXTWEAR
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order Id: #000786
            </h1>
            <p className="leading-relaxed mb-4">
              Your order has been successfully placed
            </p>
            <div className="flex mb-4">
              <a className="flex-grow  py-2 text-lg px-1">Item Description</a>
              <a className="flex-grow  py-2 text-lg px-1">Quantity</a>
              <a className="flex-grow  py-2 text-lg px-1">Item Total</a>
            </div>

            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Item Name</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">499</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Item Name</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">499</span>
            </div>
            <div className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500">Item Name</span>
              <span className="ml-auto text-gray-900">1</span>
              <span className="ml-auto text-gray-900">499</span>
            </div>

            <div className="flex mt-4">
              <span className="title-font font-medium text-2xl text-gray-900">
                SubTotal: ₹499
              </span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Track Order
              </button>
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

export default Order;
