import { useState, useEffect } from "react";
// import foodAppLogo from "../../images/banana-leaf.png";
import { FOOD_APP_LOGO } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import SwoogyLogo from "../../public/images/SwoogyLogoBold.svg";
import SwoogyLogoThin from "../../public/images/SwoogyLogoThin.svg";

const Header = () => {
  const [loginBtnName, setLoginBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  useEffect(() => {}, []);

  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="header flex justify-between shadow-lg h-[90px] items-center">
      <div className="flex w-10/12 justify-between items-center mx-auto">
        <div className="logo-container">
          {
            <img
              src={SwoogyLogoThin}
              alt="swoogy-logo"
              className="w-[90px] h-[90px]"
            />
          }
        </div>
        <div className="nav-items flex items-center">
          <ul className="flex p-4 m-10">
            {/* <li>Online Status: {onlineStatus ? "online" : "offline"}</li> */}
            <li className="px-2 font-montserrat font-bold opacity-60 ml-7">
              <Link to="/">Home</Link>
            </li>
            {/* <li className="font-GrotMed font-[500] opacity-60">Search</li> */}
            <li className="px-2 font-montserrat font-bold opacity-60 ml-7">
              <Link to="/about">About Us</Link>
            </li>
            {/* <li className="px-2 font-spaceGrotesk font-bold  opacity-70">
            <Link to="/contact">Contact Us</Link>
          </li> */}
            {/* <li className="p-2 m-2">
            <Link to="/grocery">Grocery</Link>
          </li> */}
            <li className="px-2 font-bold font-montserrat opacity-60 ml-7">
              <Link to="/cart" className="flex justify-between">
                {cartItems.length === 0 ? (
                  <span className="relative flex justify-center -left-1">
                    <svg
                      className="fill-white stroke-2 stroke-[#282c3f]"
                      viewBox="-1 0 37 32"
                      height={20}
                      width={20}
                    >
                      <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                    </svg>
                    <span className="absolute font-montserrat text-sm">
                      {cartItems.length}
                    </span>
                  </span>
                ) : (
                  <span className="relative flex justify-center -left-1">
                    <svg
                      className="fill-[#60b246] stroke-0 stroke-[#60b246]"
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
                <span> Cart</span>
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
