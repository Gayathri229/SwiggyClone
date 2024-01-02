import { useDispatch } from "react-redux";
import { CUISINE_IMAGES_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { toast } from "react-hot-toast";
import { VEG_ICON, NONVEG_ICON } from "../utils/constants";

const MenuItems = ({ itemList, isVeg }) => {
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
              {items.card.info.itemAttribute.vegClassifier === "VEG" ? (
                <img src={VEG_ICON} alt="veg-icon" className="w-5" />
              ) : (
                <img src={NONVEG_ICON} alt="nonveg-icon" className="w-5"/>
              )}
              <span className="font-semibold font-montserrat mb-1">{items.card.info.name}</span>
              <span className="text-[13px] font-montserrat opacity-90">
                ₹ {" "}
                {items.card.info.price
                  ? items.card.info.price / 100
                  : items.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs font-montserrat opacity-40">{items.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4 flex items-end">
            {items.card.info.imageId && (
              <img
                src={CUISINE_IMAGES_URL + items.card.info.imageId}
                className="w-[130px] rounded-md h-[96px]"
              />
            )}
            <div className="absolute">
              <button
                className="p-2 px-4 mx-5 w-[90px] h-[36px] bg-white shadow-lg text-green-600 text-xs font-bold rounded-lg font-montserrat"
                onClick={() => handleAddItems(items)}
              >
                ADD +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
