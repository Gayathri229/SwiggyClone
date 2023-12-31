import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeItem } from "../utils/cartSlice";

const CartItems = ({ itemList }) => {

    const dispatch = useDispatch();
    const handleDeleteItems = (item) => {
        dispatch(removeItem(item.card.info.id));
    }

  return (
    <div className="mt-4">
      {itemList.map((item) => (
        <div
          key={item.card.info.id}
          data-testid="foodItems"
          className="p-2 m-2 border-b-2 text-left flex"
        >
          <div className="w-9/12">
            <div className="flex flex-col py-2">
              <span className="font-semibold font-montserrat">{item.card.info.name}</span>
              <span className="text-sm font-spaceGrotesk opacity-90">
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-sm font-spaceGrotesk opacity-70">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4 flex items-end">
            <img
              src={CDN_URL + item.card.info.imageId}
              className="w-full rounded-md"
            />
            <div className="absolute">
              <button
                className="w-20 p-2 px-3 mx-8 text-xs bg-red-600 text-white rounded-sm font-montserrat uppercase font-semibold"
                onClick={() => handleDeleteItems(item)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
