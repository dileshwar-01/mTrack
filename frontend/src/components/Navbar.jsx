import React, { useContext, useState ,useEffect} from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const {navigate,token,setToken,user,setUser} = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

  useEffect(()=>{

  },[token])

  return (
    <div className='w-full bg-white flex justify-between items-center text-gray-900 py-2 px-4 md:px-8 lg:px-12'>
      {/* Logo */}
      <div>
        <Link to="/">
          <img className='w-24 md:w-30' src={assets.mTrackLogo} alt="mTrack Logo" />
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className='hidden md:flex items-center text-lg font-medium gap-6 lg:gap-12'>
        <NavLink to="/" className="hover:text-blue-600 transition-colors duration-200 items-center flex flex-col">
        <p>Home</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-blue-500 hidden' />
        </NavLink>

        <NavLink to="/dashboard" className="hover:text-blue-600 transition-colors duration-200 items-center flex flex-col">
        <p>Dashboard</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-blue-500 hidden' />
        </NavLink>

        <NavLink to="/add" className="hover:text-blue-600 transition-colors duration-200 items-center flex flex-col">
        <p>Add Membership</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-blue-500 hidden' />
        </NavLink>

        <NavLink to="/about" className="hover:text-blue-600 transition-colors duration-200 items-center flex flex-col">
        <p>About</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-blue-500 hidden' />
        </NavLink>
      </div>
      

      {/* Desktop Auth Buttons */}
      {/* <div className='hidden md:flex items-center text-lg font-medium gap-4 lg:gap-6'>
        <button onClick={()=>navigate('/login')}  className="cursor-pointer px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">Login</button>
      </div> */}

        <div className='flex gap-6 items-center'>
          {
            token &&
            <div className=' mx-2 flex items-center text-base gap-3 font-medium text-gray-600'>
            <img src={assets.avatar_icon} className='w-8' />
            <p>{localStorage.getItem("username")}</p> 
          </div>
          }
          
          {
        token?
         <div className='hidden md:flex items-center text-lg font-medium gap-4 lg:gap-6'>
        <button onClick={()=>{setToken('') ;localStorage.removeItem('token');navigate('/login');setUser(null)}} 
         className="cursor-pointer px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600
          transition-colors duration-200">Logout</button>
      </div>:
         <div className='hidden md:flex items-center text-lg font-medium gap-4 lg:gap-6'>
        <button onClick={()=>navigate('/login')}  className="cursor-pointer px-4 py-2 rounded-md
         bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">Login</button>
      </div>
      }
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
          <NavLink to="/" className="w-full text-center py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/dashboard" className="w-full text-center py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
          <NavLink to="/add" className="w-full text-center py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Add Membership</NavLink>
          <NavLink to="/about" className="w-full text-center py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>About</NavLink>
          <div className='flex flex-col gap-3 mt-4 w-full px-4'>
             {
               token?
                 
                    <button onClick={()=>{setIsOpen(false);setToken('') ;localStorage.removeItem('token');navigate('/login')}}  className="w-full py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Logout</button>
                 :
                 
                   <button onClick={()=>{navigate('/login');setIsOpen(false);}}  className="w-full py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Login</button>
                
              }

            {/* <button   onClick={() => { setIsOpen(false); navigate('/login');}} className="w-full py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Login</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
