import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
const Banner = () => {
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: 'url("/images/banner.png")' }}
    >
      <div className="h-full bg-black/50 backdrop-blur-sm flex items-center px-5 md:px-12">
        <motion.div
          className="w-auto md:w-1/2 flex flex-col gap-2 md:gap-5"
          initial={{y:100}}
          animate={{y:0}}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <h1 className="uppercase font-bold md:tracking-[1px] text-2xl md:text-4xl">
            Welcome to <span>NEXT</span> Cart
          </h1>
          <p className="text-justify">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae
            commodi corrupti, inventore velit sunt cupiditate reprehenderit
            asperiores?
          </p>
          <Link href={"/products"}>
            <button className="btn">Products</button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
