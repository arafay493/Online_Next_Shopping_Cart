import Cards from "@/components/Cards";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdOutlineKeyboardBackspace,
} from "react-icons/md";
import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";

const initialValues = {
  searchInput: "",
  selectInput: "",
};

const products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  // const [showPagination, setShowPagination] = useState(true);

  const formik = useFormik({
    initialValues,
  });

  const fetchProducts = async () => {
    const res = await axios.get("https://dummyjson.com/products?limit=100");
    return res.data;
  };
  const { data, isError, error, isLoading } = useQuery("data", fetchProducts);
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center overflow-hidden">
        <div>
          <ClipLoader color="#DA0037" size={100} speedMultiplier={1} />
        </div>
      </div>
    );
  }
  if (!data) return;

  const { products } = data;

  const buttonsQuantity = Math.ceil(products.length / productsPerPage);

  const handlePageBack = () => {
    currentPage > 1 ? setCurrentPage(currentPage - 1) : currentPage;
    window.scrollTo(0, 0);
  };
  const handlePageForward = () => {
    currentPage < buttonsQuantity
      ? setCurrentPage(currentPage + 1)
      : currentPage;
    window.scrollTo(0, 0);
  };

  // console.log(currentPage);
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const buttonsArray = [];

  for (let i = 1; i <= buttonsQuantity; i++) {
    buttonsArray.push(i);
  }
  const AllButtons = buttonsArray.map((curElem, index) => (
    <button
      // className={`px-3 py-2 hover:bg-inherit ${
      //   isActive == index ? "bg-black" : null
      // }`}
      className="btn px-3 py-2 hover:bg-inherit"
      key={index}
      onClick={() => handlePageNumber(curElem, index)}
    >
      {curElem}
    </button>
  ));

  const handlePageNumber = (curElem, index = currentPage) => {
    formik.resetForm()
    setCurrentPage(curElem);
    window.scrollTo(0, 0);
    // setActive(isActive => isActive === index ? null : isActive)
    // // AllButtons[index].classList.add("bg-black")
    // AllButtons[index].props.className.add("bg-black")
    // let btnClassName = AllButtons[index].props.className;
    // // btnClassName += " bg-black";
    // console.log(btnClassName)
  };

  const pageData = data.products.slice(firstIndex, lastIndex);
  // console.log(pageData)
  const category = formik.values.selectInput;
  const search = formik.values.searchInput.toLowerCase();
  let filter_data;
  if (category || search) {
    filter_data = data.products.filter((item) => {
      if (category && search) {
        const filterBoth =
          item.category === category &&
          item.title.toLowerCase().includes(search);
        return filterBoth;
      }
      if (category) {
        return item.category === category;
      } else if (search) {
        return item.title.toLowerCase().includes(search);
      }
      return item;
    });
  } else {
    filter_data = pageData.filter((item) => {
      if (category && search) {
        const filterBoth =
          item.category === category &&
          item.title.toLowerCase().includes(search);
        return filterBoth;
      }
      if (category) {
        return item.category === category;
      } else if (search) {
        return item.title.toLowerCase().includes(search);
      }
      return item;
    });
  }
  return (
    <motion.div
      className="text-white px-5 md:px-10 py-5 pt-[150px]"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      <div className="flex justify-between items-center">
        {/* <Link href={"/"} className=" w-fit px-3 py-1 rounded-sm btn">
          <div className="flex items-center gap-2">
            <MdOutlineKeyboardBackspace />
            <button>back</button>
          </div>
        </Link> */}
        <Link href={"/"} className="flex items-center gap-2 w-fit px-3 py-1 rounded-sm btn">
            <MdOutlineKeyboardBackspace />
            back
        </Link>
        <div className="border-2 border-[#DA0037] px-2 py-1 text">
          <input
            type="text"
            className="border-none outline-none focus:ring-0 bg-transparent text-xs min-w-[150px] placeholder:text-white"
            placeholder="Search Items..."
            name="searchInput"
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <h2 className="uppercase text-4xl text-center my-10">
        Available <span>Items</span>
      </h2>

      <div className="flex justify-end">
        <div>
          <select
            name="selectInput"
            className="border-2 border-[#DA0037] w-[150px] bg-transparent outline-none px-2 py-1 min-w-[170px] text-sm selection:bg-[#DA0037]"
            // value = {formik.values.searchInput}
            onChange={formik.handleChange}
          >
            <option value="" className="bg-[#171717]">
              All
            </option>
            <option value="smartphones" className="bg-[#171717]">
              Smart Phones
            </option>
            <option value="laptops" className="bg-[#171717]">
              Laptops
            </option>
            <option value="fragrances" className="bg-[#171717]">
              Fragrances
            </option>
          </select>
          <div className="text-sm">
            {filter_data.length} out of {data.products.length} products..
          </div>
        </div>
      </div>

      <motion.div
        className="products my-10"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
      >
        <Cards
          data={filter_data}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      </motion.div>
      {!(category || search) ?<div className="pagination flex items-center justify-center gap-3 mb-10 overflow-auto w-auto">
        <div className="back">
          <button onClick={handlePageBack} className="btn px-3 py-2">
            <MdOutlineArrowBackIos className="cursor-pointer" />
          </button>
        </div>
        <div className="flex flex-wrap justify-evenly gap-1 md:gap-3 items-center">
          {AllButtons}
        </div>
        <div className="forward">
          <button onClick={handlePageForward} className="btn px-3 py-2">
            <MdOutlineArrowForwardIos className="cursor-pointer" />
          </button>
        </div>
      </div> : null}
    </motion.div>
  );
};

export default products;
