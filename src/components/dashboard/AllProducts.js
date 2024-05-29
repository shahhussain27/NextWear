import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Image from "next/image";

const ProductPerfomance = ({ tshirt, hoodies, mugs, stickers }) => {
  const [selectedCategory, setSelectedCategory] = useState("tshirt");
  const [currentPage, setCurrentPage] = useState(1);

  const products = {
    tshirt,
    hoodies,
    mugs,
    stickers,
  }[selectedCategory];

  const itemsPerPage = 5;
  const totalPages = Math.ceil(Object.keys(products).length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentProducts = Object.keys(products).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <BaseCard title="All Products">
      <div className="flex flex-wrap justify-center items-center gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-6 rounded-full"
          onClick={() => {
            setSelectedCategory("tshirt");
            setCurrentPage(1);
          }}
        >
          T-Shirts
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-6 rounded-full"
          onClick={() => {
            setSelectedCategory("hoodies");
            setCurrentPage(1);
          }}
        >
          Hoodies
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-6 rounded-full"
          onClick={() => {
            setSelectedCategory("mugs");
            setCurrentPage(1);
          }}
        >
          Mugs
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-6 rounded-full"
          onClick={() => {
            setSelectedCategory("stickers");
            setCurrentPage(1);
          }}
        >
          Stickers
        </button>
      </div>
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
        className="overflow-x-scroll"
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Image
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Size
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Quantity
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Colors
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentProducts.map((item, index) => (
            <TableRow key={products[item]._id}>
              <TableCell>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>
                <Image
                  src={products[item].img}
                  alt="img"
                  height={100}
                  width={100}
                />
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  {products[item].title}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      <div>
                        {products[item].size.includes("S") && (
                          <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                            S
                          </p>
                        )}
                        {products[item].size.includes("M") && (
                          <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                            M
                          </p>
                        )}
                        {products[item].size.includes("L") && (
                          <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                            L
                          </p>
                        )}
                        {products[item].size.includes("XL") && (
                          <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                            XL
                          </p>
                        )}
                        {products[item].size.includes("XXL") && (
                          <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                            XXL
                          </p>
                        )}
                      </div>
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {products[item].availableQty}
                </Typography>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {products[item].color.includes("White") && (
                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                  {products[item].color.includes("Black") && (
                    <button className="border-2 border-gray-900 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                  {products[item].color.includes("Red") && (
                    <button className="border-2 border-rose-500 bg-rose-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                  {products[item].color.includes("Blue") && (
                    <button className="border-2 border-blue-700 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                  {products[item].color.includes("Yellow") && (
                    <button className="border-2 border-yellow-400 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none"></button>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Typography variant="h6">₹{products[item].price}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </BaseCard>
  );
};

export default ProductPerfomance;
