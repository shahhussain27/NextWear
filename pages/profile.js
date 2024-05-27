import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { ProductContext } from "@/context/ProductContext";

const Profile = () => {
  const { updateProfile, updatePassword } = useContext(ProductContext);

  const router = useRouter;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    password: "",
    newpassword: "",
    cpassword: "",
  });

  const [isMatch, setIsMatch] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleUpdate = () => {
    updateProfile(form.name, form.phone, form.address, form.pincode);
  };

  const handlePasswordUpdate = () => {
    // console.log(form.newpassword ,form.cpassword)
    if (form.newpassword == form.cpassword) {
      updatePassword(form.password, form.newpassword, form.cpassword);
      setIsMatch(false);
      setForm({ password: "", newpassword: "", cpassword: "" });
    } else {
      setIsMatch(true);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user) {
      router.push("/");
    } else if (user && token) {
      try {
        const parsedUser = JSON.parse(user);
        setForm({
          name: parsedUser.username || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
          address: parsedUser.address || "",
          pincode: parsedUser.pincode || "",
        });
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, [router]);
  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center mb-12">
            Your Profile
          </h2>
          <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">
              Delivery Details
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={form.name}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    readOnly
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="phone"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    value={form.phone}
                    minLength={10}
                    maxLength={10}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="pincode"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    onChange={handleChange}
                    value={form.pincode}
                    minLength={6}
                    maxLength={6}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="address"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    onChange={handleChange}
                    value={form.address}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={handleUpdate}
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">
              Change Password
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="password"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="newpassword"
                    className="leading-7 text-sm text-gray-600"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    onChange={handleChange}
                    value={form.newpassword}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="cpassword"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    onChange={handleChange}
                    value={form.cpassword}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={handlePasswordUpdate}
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Update
                </button>
                {isMatch && <p>Password is not match</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
