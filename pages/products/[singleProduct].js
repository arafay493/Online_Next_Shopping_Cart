import Review from "@/components/Review";
import { product_addToCart } from "@/toolkit_store/cartSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import CryptoJS from "crypto-js";

const singleProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showSlide, setShowSlide] = useState();
  const productId = router.query.singleProduct;

  // URL-safe decode the encoded data
  let dycryptedData;
  let dycryptedId;
  if (productId) {
    const urlSafeDecoded = productId.replace(/-/g, "+").replace(/_/g, "/");
    const encryptedNumberDecoded = atob(urlSafeDecoded);
    dycryptedData = CryptoJS.AES.decrypt(
      encryptedNumberDecoded,
      process.env.NEXT_PUBLIC_SECRET_KEY
    );
    dycryptedId = dycryptedData.toString(CryptoJS.enc.Utf8);
  }

  const fetchProduct = async () => {
    const res = await axios.get(
      `https://dummyjson.com/products/${dycryptedId}`
    );
    return res.data;
  };

  const { data, isError, error, isLoading } = useQuery(
    "product",
    fetchProduct,
    {
      enabled: !!productId,
    }
  );

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <ClipLoader color="#DA0037" size={100} speedMultiplier={1} />
      </div>
    );
  }

  if (isError) {
    return <h1 className="text-red-600 text-3xl">{error.message}</h1>;
  }

  if (!data) return;

  const {
    title,
    description,
    price,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = data;

  return (
    <div className="select-none mb-16">
      <div
        className="h-[85vh] bg-center bg-contain bg-fixed select-none"
        style={{
          backgroundImage: `url(${thumbnail})`,
        }}
      >
        <div className="h-full bg-gradient-to-b from-rose-600/60 to-black/50 backdrop-blur-md flex items-center justify-center px-5 md:px-12">
          <div className="flex items-center text-center flex-col md:gap-5">
            <h2 className="w-fit md:tracking-[1px] text-2xl md:text-3xl">
              {title}
            </h2>
            <Review />
          </div>
        </div>
      </div>
      <div className="px-10">
        <div className="my-10">
          {/* <Link href={"/products"} className=" w-fit px-3 py-1 rounded-sm btn">
            <div className="flex items-center gap-2">
              <MdOutlineKeyboardBackspace />
              <button>Back</button>
            </div>
          </Link> */}
          <Link
            href={"/products"}
            className="flex items-center gap-2 w-fit px-3 py-1 rounded-sm btn"
          >
            <MdOutlineKeyboardBackspace />
            Back
          </Link>
        </div>
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="flex-1 flex flex-col">
            <div className="thumbnail flex-1">
              <img src={!showSlide ? thumbnail : showSlide} alt={title} />
            </div>
            <div className="itemImages flex justify-between items-center gap-2">
              {images.map((curElem, index) => {
                return (
                  <div
                    className="w-1/4 h-[80px] border-transparent border-4 hover:border-sky-600 hover:border-4 transition-all duration-300 focus:border-sky-600"
                    onClick={() => setShowSlide(images[index])}
                    key={index}
                  >
                    <img src={curElem} alt="" className="h-full object-cover" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-[2] flex flex-col gap-4">
            <h2 className="text-3xl font-medium">{title}</h2>
            <p>{description}</p>
            <div className="catagory flex items-center gap-5">
              <span className="chip uppercase text-xs w-fit bg-[#FED7D7] text-[#822727] font-bold px-2 rounded-lg">
                {category}
              </span>
              <span className="chip uppercase text-xs w-fit bg-[#FED7D7] text-[#822727] font-bold px-2 rounded-lg">
                {brand}
              </span>
            </div>
            <div className="price text-2xl font-medium">
              $<span>{price}</span>
            </div>
            <div className="flex justify-between items-center">
              <button
                className="btn"
                onClick={() => dispatch(product_addToCart(data))}
              >
                <AiOutlineShoppingCart /> Add to Cart
              </button>
              <span className="uppercase text-green-400">
                in stock: {stock}
              </span>
            </div>
            <p className="text-xs ">
              Average Ratings : <span className="text-green-400">{rating}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default singleProduct;
