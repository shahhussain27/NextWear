import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../public/logo.png";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const forgot = () => {
  const router = useRouter();

  const notify = (message, type) => {
    toast[type](message);
  };

  const [credentials, setCredentials] = useState({
    email: "",
  });

  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
    if (e.target.name == "cpassword") {
      setCPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const sendResetEmail = async () => {
    try {
      let data = { email: credentials.email, sendMail: true };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!a.ok) {
        notify(`${a.statusText}`, "error");
        throw new Error(`HTTP error! Status: ${a.status}`);
      }
      let res = await a.json();
      if (res.success) {
        notify("Email Has Been Sent", "success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetPassword = async () => {
    try {
      if (password == cpassword) {
        // console.log(router.query.token)
        let data = {
          password: password,
          token: router.query.token,
          sendMail: false,
        };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!a.ok) {
          notify(`${a.statusText}`, "error");
          throw new Error(`HTTP error! Status: ${a.status}`);
        }
        let res = await a.json();
        if (res.success) {
          notify("Password Has Been Change", "success");
          router.push("/login");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src={logo}
          height={80}
          width={80}
          alt="logo"
          className="mx-auto h-15 w-15"
        />
        <h2 className=" text-center text-xl leading-9 tracking-tight text-gray-900">
          NextWear
        </h2>

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {router.query.token && (
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="cpassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm New Password
              </label>
              <div className="mt-2">
                <input
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
              {password !== cpassword && <p>Password is not match</p>}
            </div>

            <div>
              <button
                onClick={resetPassword}
                type="submit"
                disabled={password !== cpassword}
                className="disabled:bg-blue-400 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Continue
              </button>
            </div>
          </form>
        )}
        {!router.query.token && (
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                onClick={sendResetEmail}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Continue
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default forgot;
