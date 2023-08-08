import { motion } from "framer-motion";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
const FeaturedItems = () => {
  return (
    <section className="w-10/12 md:w-2/3 m-auto select-none">
      <h2 className="font-medium text-4xl my-10 mt-20">
        Featured <span>Items</span>
      </h2>
      <motion.div
        className="flex flex-col md:flex-row gap-5"
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0 , opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
      >
        <div className="md:flex-1 rounded-lg">
          <img src="/images/headphones.png" alt="headphones" />
        </div>
        <div className="md:flex-1 flex flex-col">
          <h3 className="text-2xl md:text-3xl">
            Apple <span>Headphones</span>
          </h3>
          <p className="mt-3 text-sm md:text-base/7">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            laboriosam, veniam vel dolorum enim laborum consectetur repudiandae
            fuga tempore odit consequuntur doloremque recusandae delectus quam?
            Animi fuga pariatur officiis rerum officia tempore tenetur, rem
            totam debitis, temporibus eum amet nihil.
          </p>
          <span className="my-3 text-xl">$ 50.00</span>
          <div className="flex items-center gap-8">
            <button className="btn">
              <AiOutlineShoppingCart /> Add to Cart
            </button>
            <IoMdShareAlt className="cursor-pointer text-xl" />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col md:flex-row-reverse gap-5 mt-20"
        initial={{ x: 200 }}
        whileInView={{ x: 0 }}
        transition={{ ease: "easeInOut", duration: 1 }}
      >
        <div className="md:flex-1">
          <img src="/images/watch.png" alt="watches" />
        </div>
        <div className="md:flex-1 flex flex-col">
          <h3 className="text-2xl md:text-3xl">
            Rolex <span>Watches</span>
          </h3>
          <p className="mt-3 text-sm md:text-base/7">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            laboriosam, veniam vel dolorum enim laborum consectetur repudiandae
            fuga tempore odit consequuntur doloremque recusandae delectus quam?
            Animi fuga pariatur officiis rerum officia tempore tenetur, rem
            totam debitis, temporibus eum amet nihil.
          </p>
          <span className="my-3 text-xl">$ 80.00</span>
          <div className="flex items-center gap-8">
            <button className="btn">
              <AiOutlineShoppingCart /> Add to Cart
            </button>
            <IoMdShareAlt className="cursor-pointer text-xl" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedItems;
