import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import CartItems from "./CartItems";
import { EMPTY_CART } from "../utils/constants";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared successfully", {
      style: {
        position: "top-center",
        className:"font-montserrat",
        fontWeight: "bold",
        duration: 3000
      }
    });
  };

  return cartItems.length === 0 ? (
    <div className="flex flex-col justify-center items-center w-6/12 mx-auto">
      <div className="flex justify-center mt-2">
        <img src={EMPTY_CART} alt="empty-cart" className="w-7/12" />
      </div>
      <h2 className="font-montserrat font-extrabold text-xl mb-4">
        Your cart is empty
      </h2>
      <p className="font-spaceGrotesk text-lg opacity-60 leading-tight mb-4">
        Add something from the menu
      </p>
      <div>
        <Link to="/">
          <button className="bg-[#F97316] p-3 m-2 text-white font-montserrat font-bold text-lg mt-2">
            Explore restaurants near you
          </button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold font-montserrat">
        Welcome to your cart
      </h1>
      <div className="w-6/12 m-auto">
        <button
          className="bg-[#F97316] text-white m-2 p-2 rounded-sm font-montserrat font-semibold"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        <CartItems itemList={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
