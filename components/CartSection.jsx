import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import CartItems from "./CartItems";
import { useDispatch, useSelector } from "react-redux";
import { product_addSubTotal } from "@/toolkit_store/cartSlice";
const CartSection = ({ setShowCart, showCart }) => {
  const data = useSelector((state) => state.cart.cartItems);
  const cart = useSelector((state) => state.cart);
  const {cartTotal} = cart
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(product_addSubTotal())
  }, [cart])
  // console.log(data)
  // if(!data) {
  //   setShowCart(false)
  //   return
  // }
  return (
    <div
      className="overflow-hidden"
    >
      <div
        className="bg-black/30 absolute top-0 bottom-0 left-0
      right-0 z-40"
        onClick={() => {
          setShowCart(!showCart);
          document.body.style.overflow = "unset";
        }}
      ></div>
      <div className="absolute top-0 right-0 bottom-0 bg-black z-50 w-screen md:w-1/3 p-10 select-none flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl">Selected Items</h3>
          <button
            onClick={() => {
              setShowCart(!showCart);
              document.body.style.overflow = "unset";
            }}
            className="text-white bg-inherit p-2"
          >
            <MdClose />
          </button>
        </div>
        <div className="flex-1 h-[1000px] overflow-auto my-3">
          {/* {!data ? (
            <h3 className="text-2xl">No Items in the cart</h3>
          ) : (
            data.map((curElem) => {
              <CartItems curElem = {curElem} key={curElem.id}/>;
            })
          )} */}
          {data.length == 0 && (
            <h3 className="text-2xl">No Items in the cart</h3>
          )}
          {data.length > 0 &&
            data.map((curElem) => (
              <CartItems cartData={curElem} key={curElem.id} />
            ))}
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-2xl">Total: </h3>
          <span className="text-2xl">${cartTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
