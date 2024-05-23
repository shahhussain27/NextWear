import React from "react";
import Image from "next/image";
import Link from "next/link";

const Mugs = () => {
  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24">
      <div className="flex flex-wrap -m-4 justify-center gap-4">
        <Link href={"/product/The Catalyzer"} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-sm">
          <a className="block relative rounded overflow-hidden ">
            <Image
              alt="ecommerce"
              className="object-cover object-center w-[70%] h-full m-auto block"
              src="https://m.media-amazon.com/images/I/61Blhw9IgKL._SL1440_.jpg"
              width={100}
              height={100}
            />
          </a>
          <div className="mt-4 ">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              Mugs
            </h3>
            <h2 className="text-black title-font text-lg font-medium">
              The Catalyzer
            </h2>
            <p className="mt-1">₹499</p>
          </div>
        </Link>
        <Link href={"/product/The Catalyzer"} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-sm">
          <a className="block relative rounded overflow-hidden ">
            <Image
              alt="ecommerce"
              className="object-cover object-center w-[70%] h-full m-auto block"
              src="https://m.media-amazon.com/images/I/61Blhw9IgKL._SL1440_.jpg"
              width={100}
              height={100}
            />
          </a>
          <div className="mt-4 ">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              Mugs
            </h3>
            <h2 className="text-black title-font text-lg font-medium">
              The Catalyzer
            </h2>
            <p className="mt-1">₹499</p>
          </div>
        </Link>
        <Link href={"/product/The Catalyzer"} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-sm">
          <a className="block relative rounded overflow-hidden ">
            <Image
              alt="ecommerce"
              className="object-cover object-center w-[70%] h-full m-auto block"
              src="https://m.media-amazon.com/images/I/61Blhw9IgKL._SL1440_.jpg"
              width={100}
              height={100}
            />
          </a>
          <div className="mt-4 ">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              Mugs
            </h3>
            <h2 className="text-black title-font text-lg font-medium">
              The Catalyzer
            </h2>
            <p className="mt-1">₹499</p>
          </div>
        </Link>
        <Link href={"/product/The Catalyzer"} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-sm">
          <a className="block relative rounded overflow-hidden ">
            <Image
              alt="ecommerce"
              className="object-cover object-center w-[70%] h-full m-auto block"
              src="https://m.media-amazon.com/images/I/61Blhw9IgKL._SL1440_.jpg"
              width={100}
              height={100}
            />
          </a>
          <div className="mt-4 ">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              Mugs
            </h3>
            <h2 className="text-black title-font text-lg font-medium">
              The Catalyzer
            </h2>
            <p className="mt-1">₹499</p>
          </div>
        </Link>
     
    
      </div>
    </div>
  </section>
  )
}

export default Mugs