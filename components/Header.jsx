import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartSection from "./CartSection";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const cart_items = useSelector((state) => state.cart.cartItems);
  return (
    <>
      <header className="absolute w-full px-5 md:px-10 py-5 z-20">
        <div className="flex justify-between items-center p-3 bg-[#DA0037]/50 text-white rounded-lg">
          <Link href={"/"} className="text-xl md:text-2xl flex items-center gap-2">
            <Image src="/images/logo.png" width={40} height={40} alt="Logo" />
            NC
          </Link>
          <button
            className="cart_btn bg-[#C57B8C] hover:bg-[#f095aa] relative"
            onClick={() => {
              setShowCart(!showCart);
              document.body.style.overflow = "hidden";
              window.scrollTo(0, 0);
            }}
          >
            <AiOutlineShoppingCart /> Cart
            {cart_items.length > 0 ? (
              <span className="w-[25px] h-[25px] text-[10px] font-bold text-white bg-[#DA0037]/50 rounded-full flex justify-center items-center">
                {cart_items.length}
              </span>
            ) : null}
          </button>
        </div>
      </header>
      {showCart && (
        <CartSection setShowCart={setShowCart} showCart={showCart} />
      )}
    </>
  );
};
export default dynamic (() => Promise.resolve(Header), {ssr: false})
// export default Header;
