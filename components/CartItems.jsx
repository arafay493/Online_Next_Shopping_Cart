import {
  product_decQuantity,
  product_incQuantity,
  product_removeItemFromCart,
} from "@/toolkit_store/cartSlice";
import { motion } from "framer-motion";
import React from "react";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
const CartItems = ({ cartData }) => {
  const dispatch = useDispatch();
  const { thumbnail, quantity, title, price, id } = cartData;
  return (
    <motion.div
      className="bg-[#333333] relative px-5 py-2 my-3 rounded-lg flex items-center gap-5"
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      <div className="flex-1">
        <img src={thumbnail} alt={title} className="w-full rounded-lg" />
      </div>
      <div className="flex-[3]">
        <p>{title}</p>
        <span>${price}</span>
        <div className="flex items-center h-9 mt-2">
          <button
            className="bg-transparent hover:bg-transparent border-2 border-r-0 h-full px-2"
            onClick={() => dispatch(product_decQuantity(cartData))}
          >
            <AiOutlineMinus />
          </button>
          <input
            type="text"
            className="ring-0 focus:outline-0 w-11 bg-transparent text-white text-[10px] border-2 h-full px-2 text-center select-none"
            value={quantity}
            readOnly
          />
          <button
            className="bg-transparent hover:bg-transparent border-2 border-l-0 h-full px-2"
            onClick={() => dispatch(product_incQuantity(cartData))}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-[8px] right-[11px] cursor-pointer hover:bg-white/50 rounded-full w-6 h-6 flex justify-center items-center"
        onClick={() => dispatch(product_removeItemFromCart(cartData))}
      >
        <AiOutlineDelete className="text-sm" />
      </div>
    </motion.div>
  );
};

export default CartItems;
