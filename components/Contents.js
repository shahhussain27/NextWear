import React from "react";
import { TbHanger } from "react-icons/tb";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineCurrencyRupee } from "react-icons/md";

const Contents = () => {
  return (
    <section className="text-gray-600 body-font ">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap m-4">
          <div className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-gray-200 border-opacity-75 p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-100 text-indigo-500 text-2xl mb-4">
                <TbHanger />
              </div>
              <h2 className="text-lg text-black font-medium title-font mb-2">
                Premium Tshirts{" "}
              </h2>
              <p className="leading-relaxed text-base">
                Our T-Shirts are 100% made of cotton.
              </p>
            </div>
          </div>
          <div className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-gray-200 border-opacity-75 p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-100 text-indigo-500 text-2xl mb-4">
                <CiDeliveryTruck />
              </div>
              <h2 className="text-lg text-black font-medium title-font mb-2">
                Free Shipping
              </h2>
              <p className="leading-relaxed text-base">
                We ship all over India for FREE.
              </p>
            </div>
          </div>
          <div className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-gray-200 border-opacity-75 p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-100 text-indigo-500 text-2xl mb-4">
                <MdOutlineCurrencyRupee />
              </div>
              <h2 className="text-lg text-black font-medium title-font mb-2">
                Exciting Offers
              </h2>
              <p className="leading-relaxed text-base">
                We provide amazing offers & discounts on our products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contents;
