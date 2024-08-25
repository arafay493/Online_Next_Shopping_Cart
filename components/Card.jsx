import { product_addToCart } from "@/toolkit_store/cartSlice";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CryptoJS from "crypto-js";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, description, price, rating, stock, thumbnail, images } =
    product;
  const encryptedId = CryptoJS.AES.encrypt(id.toString() , process.env.NEXT_PUBLIC_SECRET_KEY).toString()
  // URL-safe encode the encrypted data
  const urlSafeEncoded = btoa(encryptedId).replace(/\+/g, '-').replace(/\//g, '_');
  return (
    <motion.div
      className="mt-5 w-[32.5%] min-w-[300px] h-[470px] rounded-lg overflow-hidden bg-[#444444] flex flex-col"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      <div className="relative h-[50%] w-full">
        <Image
          src={thumbnail}
          fill
          alt="thumbnail"
          className="w-full object-cover"
        />
      </div>
      <div className="pt-10 px-5 flex-1">
        <Link href={`/products/${urlSafeEncoded}`} className="flex flex-col">
          <span className="text-white text-3xl">
            {title.length > 15 ? `${title.substr(0, 15)}...` : title}
          </span>
          <p className="text-white text-sm/6 mt-3 font-medium">
            {description.length > 50
              ? `${description.substr(0, 50)}...`
              : description}
            {description.length > 50 && <span>read more</span>}
          </p>
          <span className="text-3xl font-bold">${price}</span>
        </Link>
      </div>
      <div
        className="px-5 mb-3"
        onClick={() => dispatch(product_addToCart(product))}
      >
        <button className="btn flex justify-center w-full">
          <AiOutlineShoppingCart /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default Card;
