import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import SwoogyLogoBold from "../../public/images/SwoogyLogoBold.svg";

const Header = () => {
  const [loginBtnName, setLoginBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  useEffect(() => {}, []);

  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between shadow-lg h-[90px] items-center">
      <div className="header flex w-screen md:w-10/12 justify-between items-center mx-auto">
        <div className="logo-container">
          {
            <Link to="/">
              <img
                src={SwoogyLogoBold}
                alt="swoogy-logo"
                className="w-[100px] h-[50px] md:w-[120px] md:h-[70px]"
              />
            </Link>
          }
        </div>
        <div className="nav-items flex items-center">
          <ul className="flex md:p-4 md:m-10 p-2">
            {/* <li>Online Status: {onlineStatus ? "online" : "offline"}</li> */}
            <li className="px-2 font-montserrat font-bold opacity-60 md:ml-7 ml-1 hover:text-orangeColor hover:opacity-100">
              <Link to="/">Home</Link>
            </li>
            <li className="px-2 font-montserrat font-bold opacity-60 md:ml-7 ml-1 hover:text-orangeColor hover:opacity-100">
              <Link to="/about">About</Link>
            </li>
            {/* <li className="px-2 font-spaceGrotesk font-bold  opacity-70">
            <Link to="/contact">Contact Us</Link>
          </li> */}
            {/* <li className="p-2 m-2">
            <Link to="/grocery">Grocery</Link>
          </li> */}
            <li className="px-2 font-bold font-montserrat opacity-60 md:ml-7 ml-1 group hover:opacity-100">
              <Link to="/cart" className="flex justify-between">
                {cartItems.length === 0 ? (
                  <span className="relative flex justify-center -left-1 ">
                    <svg
                      className="fill-none stroke-2 stroke-[#282c3f] group-hover:stroke-orangeColor"
                      viewBox="-1 0 37 32"
                      height={20}
                      width={20}
                    >
                      <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                    </svg>
                    <span className="absolute font-montserrat text-sm group-hover:text-orangeColor">
                      {cartItems.length}
                    </span>
                  </span>
                ) : (
                  <span className="relative flex justify-center -left-1">
                    <svg
                      className="fill-[#60b246] stroke-0 stroke-[#60b246] group-hover:fill-orangeColor"
                      viewBox="-1 0 37 32"
                      height={20}
                      width={20}
                    >
                      <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                    </svg>
                    <span className="absolute font-montserrat text-sm text-white">
                      {cartItems.length}
                    </span>
                  </span>
                )}
                <span className="group-hover:text-orangeColor"> Cart</span>
              </Link>
            </li>
            {/* <Link to="/login">
            <button
              className="login-btn px-2"
              onClick={() => {
                loginBtnName === "Login"
                  ? setLoginBtnName("Logout")
                  : setLoginBtnName("Login");
              }}
            >
              {loginBtnName}
            </button>
          </Link> */}
            {/* <li className="font-bold">{loggedInUser}</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
