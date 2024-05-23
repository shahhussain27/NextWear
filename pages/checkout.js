import Link from "next/link";
import React from "react";
import Image from "next/image";

const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  return (
    <div className="container m-auto">
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
      <Link href={"/order"}>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-2 rounded-md">
          Pay  ₹{subTotal}
        </button>
      </Link>
    </div>
  );
};

export default Checkout;
