import Contents from "@/components/Contents";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { ProductProvider } from "@/context/ProductContext";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const notify = (msg) => toast.success(msg);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
  }, [router.query]);

  const saveCart = (setCart) => {
    localStorage.setItem("cart", JSON.stringify(setCart));
    let subt = 0;
    let keys = Object.keys(setCart);
    for (let i = 0; i < keys.length; i++) {
      subt += setCart[keys[i]].price * setCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const addToCart = (itemCode, qty, price, name, size, variant, img) => {
    // console.log(qty);
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + 1;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant, img };
    }
    setCart(newCart);
    // console.log(newCart)
    saveCart(newCart);
    notify(`${name} is added into your cart`);
  };

  const removeFromCart = (itemCode, qty) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const buyNow = (itemCode, qty, price, name, size, variant, img) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, variant, img };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({ value: null });
    setKey(Math.random());
    router.push("/login");
  };
  return (
    <>
      <ProductProvider>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          waitingTime={500}
        />
        {key && (
          <Navbar
            user={user}
            key={key}
            logout={logout}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            subTotal={subTotal}
          />
        )}

        <Component
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
          buyNow={buyNow}
          user={user}
          {...pageProps}
        />
        <Contents />
        <Footer />
        <ToastContainer
          position="bottom-right"
          hideProgressBar={true}
          closeOnClick
        />
      </ProductProvider>
    </>
  );
}
