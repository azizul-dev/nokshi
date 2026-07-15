import Link from "next/link";
import React from "react";
import { FaHome, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import MyLink from "./MyLink";

const NavBar = () => {
  const links = (
    <>
      <li>
        <MyLink href="/">
          <FaHome /> Home
        </MyLink>
      </li>
      <li className="mt-2 lg:mt-0 lg:ml-3">
        <MyLink href="/timeLine">
          <FaShoppingBag /> Products
        </MyLink>
      </li>
      <li className="mt-2 lg:mt-0 lg:ml-3">
        <MyLink href="/stats">
          <FaShoppingCart /> Cart
        </MyLink>
      </li>
    </>
  );

  return (
    <div className=" sticky top-0 z-50 ">
      <div className="navbar bg-base-100 shadow-sm electric-glow rounded-md">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          <Link
            href={"/"}
            className="btn btn-ghost font-bold text-3xl bg-gradient-to-r from-[#f4af10] to-[#d6440a] text-transparent bg-clip-text"
          >
            Nok<span>Shi</span>
          </Link>
        </div>

        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
