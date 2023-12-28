import { useDispatch, useSelector } from "react-redux";
import MenuItems from "./MenuItems";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className="bg-black text-white m-2 p-2 rounded-lg"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItems.length === 0 && (
          <h1 className="font-bold text-xl">
            Cart is empty. Add items to the cart!
          </h1>
        )}
        <MenuItems itemList={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
