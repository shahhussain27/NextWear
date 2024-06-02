import Tshirts from "./tshirts";
import Contents from "../components/Contents";
import React, { useEffect, useContext, useState } from "react";
import Image from "next/image";
import { ProductContext } from "@/context/ProductContext";
import Link from "next/link";

export default function Home() {
  const { searchResults, results } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const productKeys =
    results && results.results ? Object.keys(results.results) : [];

  const handleResult = (query) => {
    setSearchQuery(query);
  };

  // console.log(results.results);
  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      searchResults(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <>
      <main className="p-2">
        <div className="flex flex-col items-center justify-center mt-4">
          <input
            type="search"
            onChange={(e) => {
              handleResult(e.target.value);
            }}
            placeholder="Search in NextWear"
            className="w-full md:w-1/4 p-2 rounded border border-blue-600"
          />
          <div className="flex flex-col items-center bg-white w-full md:w-1/4 shadow-lg">
            {searchQuery && (
              <div className="w-full">
                {productKeys.length === 0 ? (
                  <p></p>
                ) : (
                  productKeys.map((item, index) => (
                    <Link
                      href={`/product/${results.results[item].slug}`}
                      key={index}
                    >
                      <div className="flex gap-4 p-2 bg-white hover:bg-gray-50 cursor-pointer">
                        <Image
                          src={results.results[item].img}
                          alt={results.results[item].title}
                          height={70}
                          width={70}
                        />
                        <div className="flex flex-col">
                          <p className="font-semibold">
                            {results.results[item].title} (
                            {results.results[item].color.join("/") || "White"})
                          </p>

                          <p>{results.results[item].size.join("/")}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <Tshirts />
        <Contents />
      </main>
    </>
  );
}
