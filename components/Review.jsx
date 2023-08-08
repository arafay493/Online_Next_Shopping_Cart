import React from 'react'
import {BsStarFill, BsStarHalf, BsStar} from "react-icons/bs"
const Review = () => {
  return (
    <div className='flex justify-between text-3xl text-[#FFA500] font-thin gap-2'>
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
        <BsStarHalf />
        <BsStar />
    </div>
  )
}

export default Review