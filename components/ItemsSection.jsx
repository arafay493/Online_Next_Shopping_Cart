
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoMdArrowRoundForward } from "react-icons/io";
import Card from "./Card";
import axios from "axios";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";

const ItemsSection = () => {
  const fetchProducts = async () => {
    const res = await axios.get("https://dummyjson.com/products?limit=100");
    return res.data;
  };

  const { data, isLoading } = useQuery("data", fetchProducts);
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center overflow-hidden">
        <div>
          <ClipLoader color="#DA0037" size={50} speedMultiplier={1} />
        </div>
      </div>
    );
  }
  if (!data) return;
  const { products } = data;
  const ProductSliceArray = products.slice(0, 3).map((curElem) => curElem);
  const ProductSlice = ProductSliceArray.map((curElem) => <Card key={curElem.id} product = {curElem}/>)

  return (
    <motion.div
      className="my-10 px-5 overflow-hidden"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      <h2 className="uppercase text-4xl text-center my-10">
        Available <span>items</span>
      </h2>
      <div className="flex gap-3 flex-wrap justify-center mb-10">
        {ProductSlice}
      </div>
      <Link href={"/products"}>
        <button className="btn flex justify-center m-auto w-full sm:w-1/2 ">
          All Products {"    "}
          <IoMdArrowRoundForward />
        </button>
      </Link>
    </motion.div>
  );
};

export default ItemsSection;
