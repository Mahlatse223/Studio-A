import React from 'react';
const Navbar = () => {
  return (
    <div className="fixed w-full h-[80px] left-0 top-0 bg-white  flex justify-between items-center px-8 z-50">
      {/* Left-aligned h1 */}
      <h1 className="font-aboreto font-normal text-[32px] leading-[37px] text-[#398DFA]">
        STUDIO APARTMENTS
      </h1>
      {/* Centered navigation menu */}
      <div className="flex justify-center flex-grow">
        <ul className="flex space-x-8 text-black font-roboto font-normal text-[24px] leading-[28px]">
          <li className="relative group">
            <a 
              href="#" 
              className="transition-all duration-300">
              Home
              <span className="absolute bottom-0 left-0 w-[75%] h-[2px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
            </a>
          </li>
          <li className="relative group">
            <a 
              href="#" 
              className="transition-all duration-300">
              Support
              <span className="absolute bottom-0 left-0 w-[75%] h-[2px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
            </a>
          </li>
          <li className="relative group">
            <a 
              href="#" 
              className="transition-all duration-300">
              Contact
              <span className="absolute bottom-0 left-0 w-[75%] h-[2px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
            </a>
          </li>
        </ul>
      </div>
      {/* Right-aligned h2 */}
      <h2 className="text-black font-roboto text-[24px] leading-[28px]">
        <a href="#">Profile</a>
      </h2>
    </div>
  );
}
export default Navbar;