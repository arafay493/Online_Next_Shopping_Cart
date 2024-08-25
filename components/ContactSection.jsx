import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const ContactSection = () => {
  return (
    <div className="h-[400px] w-screen flex items-center overflow-hidden">
      <motion.div
        className="w-full h-full bg-cover relative bg-[url(/images/contact.png)]"
        // style={{
        //   backgroundImage: "url(/images/contact.png)",
        // }}
        initial={{ y: 100 }}
        whileInView={{ y: 0 }}
        transition={{ ease: "easeInOut", duration: 1 }}
      >
        <div className="h-full w-full backdrop-blur-[2px] bg-gradient-to-br from-rose-600/50 to-rose-950/25"></div>
        <div className="absolute w-full md:w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 text-center items-center px-10 sm:px-0">
          <h2 className="text-center text-3xl">
            Contact <span>US</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatem consectetur eaque. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ipsum, error.
          </p>
          <Link href={"/contact"} className="btn">
              Info <BsArrowRight />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactSection;
