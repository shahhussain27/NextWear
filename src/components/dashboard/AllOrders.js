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
  Button,
  Collapse,
} from "@mui/material";
import Image from "next/image";
import BaseCard from "../baseCard/BaseCard";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",

  p: 4,
};

const AllOrders = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [info, setInfo] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (email, phone, address, state, city, pincode) => {
    setInfo([email, phone, address, state, city, pincode]);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleToggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const currentOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <BaseCard
        title="All Orders"
        sx={{
          overflowX: "scroll",
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
            overflowX: "scroll",
          }}
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
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Order Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Amount
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Devlivery Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Customer Details
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Order Details
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((order, index) => (
              <React.Fragment key={order._id}>
                <TableRow>
                  <TableCell>
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                    >
                      {order.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {order.orderId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      ₹{order.amount}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    {order.devliveryStatus.includes("unshipped") && (
                      <Typography className="bg-yellow-400 text-white text-center rounded-full">
                        {order.devliveryStatus}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      <Button
                        onClick={() => {
                          handleOpen(
                            order.email,
                            order.phone,
                            order.address,
                            order.state,
                            order.city,
                            order.pincode
                          );
                        }}
                        variant="contained"
                        className="bg-blue-600 hover:bg-blue-700 text-center"
                      >
                        Show
                      </Button>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      className="bg-blue-600 hover:bg-blue-700 text-center"
                      onClick={() => handleToggleExpand(order._id)}
                    >
                      More
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded">
                        Fulfill Order
                      </button>
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={7}
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                  >
                    <Collapse
                      in={expandedOrderId === order._id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Table size="small" aria-label="products">
                          <TableHead>
                            <TableRow>
                              <TableCell>Product Image</TableCell>
                              <TableCell>Product Name</TableCell>
                              <TableCell>Product Size</TableCell>
                              <TableCell>Product Color</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Object.values(order.products).map((product) => (
                              <TableRow key={product.productId}>
                                <TableCell>
                                  <Image
                                    src={product.img}
                                    alt="img"
                                    height={60}
                                    width={60}
                                  />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>
                                  {" "}
                                  <div>
                                    {product.size.includes("S") && (
                                      <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                                        S
                                      </p>
                                    )}
                                    {product.size.includes("M") && (
                                      <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                                        M
                                      </p>
                                    )}
                                    {product.size.includes("L") && (
                                      <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                                        L
                                      </p>
                                    )}
                                    {product.size.includes("XL") && (
                                      <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                                        XL
                                      </p>
                                    )}
                                    {product.size.includes("XXL") && (
                                      <p className="mt-1 mr-1 border border-gray-300 py-1 px-2 rounded-sm text-black inline-block">
                                        XXL
                                      </p>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-1">
                                    {product.variant.includes("White") && (
                                      <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                    )}
                                    {product.variant.includes("Black") && (
                                      <button className="border-2 border-gray-900 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                                    )}
                                    {product.variant.includes("Red") && (
                                      <button className="border-2 border-rose-500 bg-rose-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                    )}
                                    {product.variant.includes("Blue") && (
                                      <button className="border-2 border-blue-700 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    )}
                                    {product.variant.includes("Yellow") && (
                                      <button className="border-2 border-yellow-400 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none"></button>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>{product.qty}</TableCell>
                                <TableCell>₹{product.price}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Phone
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Address
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    State
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    City
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Pincode{" "}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <React.Fragment>
                <TableRow>
                  <TableCell>{info[0]}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                    >
                      {info[1]}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {info[2]}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {info[3]}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{info[4]}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{info[5]}</Typography>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </>
  );
};

export default AllOrders;
