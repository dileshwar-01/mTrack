import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

  return (
    <div className='w-full bg-white mt-2 mx-auto flex justify-between items-center text-gray-900 px-4 py-2 md:px-8 lg:px-12'>
      {/* Logo */}
      <div>
        <Link to="/">
          <img className='w-24 md:w-30' src={assets.mTrackLogo} alt="mTrack Logo" />
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className='hidden md:flex items-center text-lg font-medium gap-6 lg:gap-12'>
        <Link to="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>
        <Link to="/dashboard" className="hover:text-blue-600 transition-colors duration-200">Dashboard</Link>
        <Link to="/add" className="hover:text-blue-600 transition-colors duration-200">Add Membership</Link>
        <Link to="/about" className="hover:text-blue-600 transition-colors duration-200">About</Link>
      </div>

      {/* Desktop Auth Buttons */}
      <div className='hidden md:flex items-center text-lg font-medium gap-4 lg:gap-6'>
        {/* <button className="cursor-pointer px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200">SignUp</button> */}
        <button className="cursor-pointer px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">Login</button>
      </div>

      {/* Mobile Menu Button (Hamburger) */}
      <div className='md:hidden'>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className='md:hidden absolute top-16 left-0 w-full bg-white shadow-lg py-4 flex flex-col items-center gap-4 text-lg font-medium z-10'>
          <Link to="/" className="w-full text-center py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/dashboard" className="w-full text-center py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/add" className="w-full text-center py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Add Membership</Link>
          <Link to="/about" className="w-full text-center py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>About</Link>
          <div className='flex flex-col gap-3 mt-4 w-full px-4'>
            <button className="w-full py-2 rounded-md border border-gray-300 hover:bg-gray-100">SignUp</button>
            <button className="w-full py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
