import { useRouter } from "next/router";
import React, { useContext } from "react";
import mongoose from "mongoose";
import Order from "@/models/Order";
import Image from "next/image";
import { ProductContext } from "@/context/ProductContext";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
};

const TrackOrder = ({ order }) => {
  const { cancelOrder } = useContext(ProductContext);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  // console.log(JSON.parse(order.paymentInfo).razorpayPaymentId);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function refundPayment(paymentId, amount) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/refund`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentId, amount }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refund payment");
      }

      const data = await response.json();
      cancelOrder(order._id);
      router.push("/");
      // console.log("Refund successful:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <section className=" py-8 antialiased  md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
          Track the delivery of order #{order.orderId}
        </h2>

        <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
          <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200  lg:max-w-xl xl:max-w-2xl">
            {Object.values(order.products).map((item, index) => (
              <div className="space-y-4 p-6" key={index}>
                <div className="flex items-center gap-6">
                  <a className="h-14 w-14 shrink-0">
                    <Image
                      className=""
                      src={item.img}
                      alt="img"
                      height={100}
                      width={100}
                    />
                  </a>

                  <a className="min-w-0 flex-1 font-medium text-gray-900 hover:underline ">
                    {" "}
                    {item.name} ({item.size}/{item.variant})
                  </a>
                  <div className="flex items-center justify-end gap-4">
                    <div className="flex items-center justify-end gap-4">
                      <p className="text-base font-normal text-gray-900 ">
                        x{item.qty}
                      </p>

                      <p className="text-xl font-bold leading-tight text-gray-900 ">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="space-y-4 bg-gray-50 p-6 ">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 ">Original price</dt>
                  <dd className="font-medium text-gray-900 ">
                    ₹{order.amount}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 ">Savings</dt>
                  <dd className="text-base font-medium text-green-500">₹0</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 ">Store Pickup</dt>
                  <dd className="font-medium text-gray-900 ">₹0</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 ">Tax</dt>
                  <dd className="font-medium text-gray-900 ">₹0</dd>
                </dl>
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                <dt className="text-lg font-bold text-gray-900 ">Total</dt>
                <dd className="text-lg font-bold text-gray-900 ">
                  ₹{order.amount}
                </dd>
              </dl>
            </div>
          </div>

          <div className="mt-6 grow sm:mt-8 lg:mt-0">
            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm  ">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Order history
              </h3>

              <ol className="relative ms-3 border-s border-gray-200 ">
                <li className="mb-10 ms-6">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white ">
                    <svg
                      className="h-4 w-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                      />
                    </svg>
                  </span>
                  <h4 className="mb-0.5 text-base font-semibold text-gray-900 ">
                    Estimated delivery in 24 Nov 2023
                  </h4>
                  <p className="text-sm font-normal text-gray-500 ">
                    Products delivered
                  </p>
                </li>

                <li className="mb-10 ms-6">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                    <svg
                      className="h-4 w-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>
                  </span>
                  <h4 className="mb-0.5 text-base font-semibold ">
                    22 Nov 2023, 6:07
                  </h4>
                  <p className="text-sm font-normal text-gray-500 ">Shipped</p>
                </li>

                <li className="mb-10 ms-6 text-primary-700 ">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white">
                    <svg
                      className="h-4 w-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 11.917 9.724 16.5 19 7.5"
                      />
                    </svg>
                  </span>
                  <h4 className="mb-0.5 text-base font-semibold">
                    22 Nov 2023, 12:27
                  </h4>
                  <p className="text-sm">Packaging </p>
                </li>

                <li className="ms-6 text-primary-700 ">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center bg-gray-200 rounded-full bg-primary-100 ring-8 ring-white ">
                    <svg
                      className="h-4 w-4 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 3v4a1 1 0 0 1-1 1H5m8-2h3m-3 3h3m-4 3v6m4-3H8M19 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 12v6h8v-6H8Z"
                      ></path>
                    </svg>
                  </span>
                  <div>
                    <h4 className="mb-0.5 font-semibold">19 Nov 2023, 10:45</h4>
                    <p className="text-sm font-medium">Order placed</p>
                  </div>
                </li>
              </ol>

              <div className="gap-4 sm:flex sm:items-center">
                <button
                  type="button"
                  onClick={handleOpen}
                  className="w-full rounded-lg  border border-gray-200  px-5  py-2.5 text-sm font-medium text-gray-900 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 "
                >
                  Cancel the order
                </button>

                <a
                  href="#"
                  className="mt-4 flex w-full border border-gray-200 items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  sm:mt-0"
                >
                  Order details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div style={style} className="w-full md:w-2/4">
          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-md">
            <div className="text-xl text-center font-semibold text-gray-800">
              Are you sure you want to cancel this order?
            </div>
            <div className="mt-2 text-center text-gray-600 ">
              Amount will be credited to your bank account within 5-7 working
              days after the refund has processed
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleClose}
                className="border border-gray-200 hover:bg-gray-100 py-1.5 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  refundPayment(
                    JSON.parse(order.paymentInfo).razorpayPaymentId,
                    order.amount
                  );
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-2 rounded"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default TrackOrder;
