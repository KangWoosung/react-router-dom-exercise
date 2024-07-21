/*
flex h-12 items-center justify-center  w-[100dvw]  bg-gray-200 p-3 text-xl

      <div className="flex items-center justify-between w-full max-w-screen-lg ">

*/

import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-[100dvw]  bg-gray-400 ">
      <div className="flex items-center justify-around w-full max-w-screen-lg bg-gray-400 px-3 py-4">
        <div>Footer</div>
        <ul>
          <li>Contact</li>
          <li>Copyright</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
