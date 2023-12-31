import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { toast } from "react-hot-toast";

const MenuItems = ({ itemList }) => {
  const dispatch = useDispatch();

  const handleAddItems = (items) => {
    dispatch(addItem(items));
    toast.success("Item added to cart", {
      style: {
        className: "font-montserrat",
        fontWeight: "bold",
        duration: 3000,
      },
    });
  };

  return (
    <div>
      {itemList.map((items) => (
        <div
          key={items.card.info.id}
          data-testid="foodItems"
          className="p-2 m-2 border-b-2 text-left flex"
        >
          <div className="w-9/12">
            <div className="flex flex-col py-2">
              <span className="font-semibold">{items.card.info.name}</span>
              <span className="text-sm">
                ₹
                {items.card.info.price
                  ? items.card.info.price / 100
                  : items.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{items.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4 flex items-end">
            <img
              src={CDN_URL + items.card.info.imageId}
              className="w-full rounded-md"
            />
            <div className="absolute">
              <button
                className="p-2 px-4 mx-8 bg-green-900 shadow-lg text-white rounded-lg"
                onClick={() => handleAddItems(items)}
              >
                Add +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
