import React, { useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductContext } from "@/context/ProductContext";

const Stickers = () => {
  const { stickers } = useContext(ProductContext);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24">
        <div className="flex flex-wrap -m-4 justify-center gap-4">
          {Object.keys(stickers).length === 0 && <p>New stock coming soon!</p>}
          {Object.keys(stickers).map((item, index) => (
            <Link
              href={`/product/${stickers[item].slug}`}
              className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-sm"
              key={stickers[item]._id}
            >
              <a className="block relative rounded overflow-hidden">
                <Image
                  alt={stickers[item].title}
                  className="object-cover object-center w-[70%] h-full m-auto block"
                  src={stickers[item].img}
                  width={100}
                  height={100}
                />
              </a>
              <div className="mt-4">
                <h3 className=" text-gray-500 text-xs tracking-widest title-font mb-1">
                  Stickers
                </h3>
                <div className="flex justify-between text-black title-font text-lg font-medium">
                  <h2>{stickers[item].title}</h2>
                </div>
                <p className="mt-1">₹{stickers[item].price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stickers;
