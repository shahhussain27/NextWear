import React, { useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductContext } from "../context/ProductContext";

const Tshirts = () => {
  const { tshirt } = useContext(ProductContext);
  // console.log(product);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24">
        <div className="flex flex-wrap -m-4 justify-center gap-4">
          {Object.keys(tshirt).length === 0 && <p>New stock coming soon!</p>}
          {Object.keys(tshirt).map((item, index) => (
            <Link
              href={`/product/${tshirt[item].slug}`}
              className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-sm"
              key={tshirt[item]._id}
            >
              <a className="block relative rounded overflow-hidden">
                <Image
                  alt={tshirt[item].title}
                  className="object-cover object-center w-[70%] h-full m-auto block"
                  src={tshirt[item].img}
                  width={100}
                  height={100}
                />
              </a>
              <div className="mt-4">
                <h3 className=" text-gray-500 text-xs tracking-widest title-font mb-1">
                  T-Shirts
                </h3>
                <div className="flex justify-between text-black title-font text-lg font-medium">
                  <h2>{tshirt[item].title}</h2>
                  <div className="flex gap-1">
                    {tshirt[item].color.includes("White") && (
                      <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    )}
                    {tshirt[item].color.includes("Black") && (
                      <button className="border-2 border-gray-900 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                    )}
                    {tshirt[item].color.includes("Red") && (
                      <button className="border-2 border-rose-500 bg-rose-500 rounded-full w-6 h-6 focus:outline-none"></button>
                    )}
                    {tshirt[item].color.includes("Blue") && (
                      <button className="border-2 border-blue-700 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    )}
                    {tshirt[item].color.includes("Yellow") && (
                      <button className="border-2 border-yellow-400 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none"></button>
                    )}
                  </div>
                </div>
                <p className="mt-1">₹{tshirt[item].price}</p>
                <div className="flex justify-between">
                  <div>
                    {tshirt[item].size.includes("S") && (
                      <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                        S
                      </p>
                    )}
                    {tshirt[item].size.includes("M") && (
                      <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                        M
                      </p>
                    )}
                    {tshirt[item].size.includes("L") && (
                      <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                        L
                      </p>
                    )}
                    {tshirt[item].size.includes("XL") && (
                      <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                        XL
                      </p>
                    )}
                    {tshirt[item].size.includes("XXL") && (
                      <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                        XXL
                      </p>
                    )}
                  </div>
                  {/* <div>
                    {tshirt[item].availableQty >= 0 && (
                      <h2 className="text-rose-500 font-bold font-mono text-sm border-2 border-rose- p-1 rounded-md">
                        Out Of Stock
                      </h2>
                    )}
                  </div> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tshirts;
