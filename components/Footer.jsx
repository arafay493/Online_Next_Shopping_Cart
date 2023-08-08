import Link from 'next/link'
import React from 'react'
import {BsLinkedin , BsGithub, BsEnvelope , BsWhatsapp} from "react-icons/bs"
const Footer = () => {
  return (
    <footer className='px-10 py-6 bg-black flex flex-col gap-5 text-[#CBD5E0] select-none items-center md:items-start'>
      <h2 className='text-3xl font-semibold'><span>Next Cart</span></h2>
      <p>Developed by ABDUL RAFAY.</p>
      <div className='flex items-center gap-5 text-xl'>
        <Link href={"/"}><BsLinkedin /></Link>
        <Link href={"/"}><BsGithub /></Link>
        <Link href={"/"}><BsEnvelope /></Link>
        <Link href={"/"}><BsWhatsapp /></Link>
      </div>
      <div className='mt-5 flex flex-col md:flex-row justify-between items-center w-full'>
        <p className='text-center md:text-start mb-5 md:mb-0 flex-[3]'>Copyright © 2023 All rights reserved designed and developed by <span>Abdul Rafay</span></p>
        <ul className='flex gap-5 font-semibold'>
          <li><Link href={"/"}>Home</Link></li>
          <li><Link href={"/products"}>Products</Link></li>
          <li><Link href={"/contact"}>Contact</Link></li>
        </ul>
      </div>
    </footer> 
  )
}

export default Footer