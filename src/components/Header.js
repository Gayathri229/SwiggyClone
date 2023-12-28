import { useState, useEffect } from "react";
// import foodAppLogo from "../../images/banana-leaf.png";
import { FOOD_APP_LOGO } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const [loginBtnName, setLoginBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  useEffect(() => {}, []);

  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div className="header flex justify-between shadow-lg mb-2 h-24">
      <div className="logo-container ml-4">
        <img className="logo w-24" src={FOOD_APP_LOGO} alt="Food App Logo" />
      </div>
      <div className="nav-items flex items-center">
        <ul className="flex p-4 m-4">
          {/* <li>Online Status: {onlineStatus ? "online" : "offline"}</li> */}
          <li className="px-2">
            <Link to="/">Home</Link>
          </li>
          <li className="px-2">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-2">
            <Link to="/contact">Contact Us</Link>
          </li>
          {/* <li className="p-2 m-2">
            <Link to="/grocery">Grocery</Link>
          </li> */}
          <li className="px-2 font-bold">
            <Link to="/cart">Cart - ({cartItems.length} items)</Link>
          </li>
          <Link to="/login">
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
          </Link>
          {/* <li className="font-bold">{loggedInUser}</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
