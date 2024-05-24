import React, { useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductContext } from "@/context/ProductContext";

const Mugs = () => {
  const { mugs } = useContext(ProductContext);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24">
        <div className="flex flex-wrap -m-4 justify-center gap-4">
          {Object.keys(mugs).length === 0 && <p>New stock coming soon!</p>}
          {Object.keys(mugs).map((item, index) => (
            <Link
              href={`/product/${mugs[item].slug}`}
              className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-sm"
              key={mugs[item]._id}
            >
              <a className="block relative rounded overflow-hidden">
                <Image
                  alt={mugs[item].title}
                  className="object-cover object-center w-[70%] h-full m-auto block"
                  src={mugs[item].img}
                  width={100}
                  height={100}
                />
              </a>
              <div className="mt-4">
                <h3 className=" text-gray-500 text-xs tracking-widest title-font mb-1">
                  Mugs
                </h3>

                <p className="mt-1">₹{mugs[item].price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mugs;
