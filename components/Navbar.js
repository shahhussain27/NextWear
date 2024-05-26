import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { IoIosCloseCircleOutline, IoIosLogOut } from "react-icons/io";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import logo from "../public/logo.png";
import emptyCart from "../public/empty-cart.png";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";

const Navbar = ({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  user,
  key,
  logout,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const router = useRouter();


  // console.log(user.value)

  // console.log(cart)

  return (
    <header className="text-gray-600 body-font shadow-xl sticky top-0 bg-white z-10">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <Image
            src={logo}
            alt="logo"
            height={60}
            width={60}
            className="w-15 h-15 text-white"
          />
          <span className="ml-3 text-xl">NextWear</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base text-black justify-center gap-4">
          <Link href={"/tshirts"}>T-Shirts</Link>
          <Link href={"/hoodies"}>Hoodies</Link>
          <Link href={"/stickers"}>Stickers</Link>
          <Link href={"/mugs"}>Mugs</Link>
        </nav>
        {user.value && (
          <div className="flex">
            <Dropdown>
              <DropdownTrigger>
                <button
                  className="text-black text-3xl md:mt-0 mt-4 mr-4 "
                  variant="bordered"
                >
                  <CiUser />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Static Actions"
                className="bg-white border-1 border-gray-400 shadow-md rounded-md w-40 py-1 px-2 text-"
              >
                <DropdownItem
                  className="hover:bg-gray-100 rounded-md"
                  showDivider
                  startContent={<CiUser />}
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  className="hover:bg-gray-100 rounded-md"
                  showDivider
                  startContent={<CiShoppingCart />}
                  onClick={() => {
                    router.push("/orders");
                  }}
                >
                  Orders
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="hover:bg-rose-600 hover:text-white rounded-md"
                  color="danger"
                  showDivider
                  onClick={logout}
                  startContent={<IoIosLogOut />}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div
              className="text-black text-4xl md:mt-0 mt-4 mr-4 cursor-pointer relative"
              onClick={toggleDrawer}
            >
              <CiShoppingCart />
              {Object.keys(cart).length !== 0 && (
                <span className=" absolute top-0 right-0 h-5 w-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
                  {Object.keys(cart).length}
                </span>
              )}
            </div>
          </div>
        )}

        {!user.value && (
          <div className="flex gap-2 md:mt-0 mt-4 cursor-pointer relative">
            <Link href={"/login"}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-2 rounded-md">
                Login
              </button>
            </Link>
            <Link href={"/signup"}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-2 rounded-md">
                Sign Up
              </button>
            </Link>
          </div>
        )}

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          size={400}
          className="p-4 text-black overflow-y-scroll"
        >
          <>
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-xl">Shopping Cart</h3>
              <button className="text-3xl" onClick={toggleDrawer}>
                <IoIosCloseCircleOutline />
              </button>
            </div>

            {Object.keys(cart).length === 0 && (
              <div className="flex flex-col item-center justify-center gap-2 mb-4">
                <Image
                  src={emptyCart}
                  alt="empty-cart"
                  height={100}
                  width={100}
                />
                <h2>Your NextWear Cart is empty</h2>
              </div>
            )}
            {Object.keys(cart).map((item, index) => {
              return (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div
                      key={item}
                      className="flex gap-2 items-center font-semibold"
                    >
                      <Image src={cart[item].img} width={70} height={70} />
                      <div className="flex flex-col justify-center items-start">
                        <h3>{cart[item].name}</h3>
                        <div className="flex justify-center items-center gap-2">
                          {" "}
                          <p className="border border-gray-300 px-1 rounded-sm text-black text-sm text-center w-1/2">
                            {cart[item].size}
                          </p>
                          <div className="flex">
                            {cart[item].variant.includes("White") && (
                              <button className="border-2 border-gray-300 rounded-full w-4 h-4 focus:outline-none"></button>
                            )}
                            {cart[item].variant.includes("Black") && (
                              <button className="border-2 border-gray-900 bg-black rounded-full w-4 h-4 focus:outline-none"></button>
                            )}
                            {cart[item].variant.includes("Red") && (
                              <button className="border-2 border-rose-500 bg-rose-500 rounded-full w-4 h-4 focus:outline-none"></button>
                            )}
                            {cart[item].variant.includes("Blue") && (
                              <button className="border-2 border-blue-700 bg-blue-700 rounded-full w-4 h-4 focus:outline-none"></button>
                            )}
                            {cart[item].variant.includes("Yellow") && (
                              <button className="border-2 border-yellow-400 bg-yellow-400 rounded-full w-4 h-4 focus:outline-none"></button>
                            )}
                          </div>
                        </div>
                      </div>
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

            <div>
              <h3 className="font-bold mb-4">Subtotal: ₹{subTotal}</h3>
              <div className="flex gap-2">
                <Link href={"/checkout"}>
                  <button
                    disabled={Object.keys(cart).length === 0}
                    className="disabled:bg-blue-400 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-2 rounded-md"
                  >
                    Checkout
                  </button>
                </Link>
                <button
                  disabled={Object.keys(cart).length === 0}
                  className="disabled:bg-blue-400 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-md"
                  onClick={clearCart}
                >
                  Clear
                </button>
              </div>
            </div>
          </>
        </Drawer>
      </div>
    </header>
  );
};

export default Navbar;
