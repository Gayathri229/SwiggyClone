import { useDispatch } from "react-redux";
import { CUISINE_IMAGES_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
import { toast } from "react-hot-toast";
import { VEG_ICON, NONVEG_ICON } from "../utils/constants";
import { useState } from "react";

const MenuItems = ({ itemList, isVeg }) => {
  const dispatch = useDispatch();
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const [showMoreList, setShowMoreList] = useState(
    Array(itemList.length).fill(false)
  );

  const handleAddItems = (items) => {
    dispatch(addItem(items));
    toast.success("Item added to cart", {
      style: {
        className: "font-montserrat",
        fontWeight: "bold",
        duration: 3000,
      },
    });

    // toast.custom(
    //   <span className="bg-white rounded-sm font-bold bottom-0 align-center">
    //     Item added to cart
    //   </span>
    // );
  };

  const handleShowMore = (index) => {
    const updatedShowMoreList = [...showMoreList];
    updatedShowMoreList[index] = !updatedShowMoreList[index];
    setShowMoreList(updatedShowMoreList);
  };

  return (
    <div>
      {itemList.map((items, index) => (
        <div
          key={items.card.info.id}
          data-testid="foodItems"
          className="p-2 md:m-2 border-b-2 text-left flex items-start"
        >
          <div className="w-7/12 md:w-9/12">
            <div className="flex flex-col py-2">
              {items.card.info.itemAttribute.vegClassifier === "VEG" ? (
                <img src={VEG_ICON} alt="veg-icon" className="w-5" />
              ) : (
                <img src={NONVEG_ICON} alt="nonveg-icon" className="w-5" />
              )}
              <span className="font-semibold text-lg md:text-base md:mb-1">
                {items.card.info.name}
              </span>
              <span className="text-lg md:text-[13px] opacity-90">
                ₹{" "}
                {items.card.info.price
                  ? items.card.info.price / 100
                  : items.card.info.defaultPrice / 100}
              </span>
            </div>
            <div>
              <p className="hidden md:block text-base md:text-xs opacity-40">
                {items?.card?.info?.description}
              </p>
              {isMobile && (
                <div className="text-base md:text-xs opacity-40">
                  <span>
                    {showMoreList[index]
                      ? items?.card?.info?.description
                      : items?.card?.info?.description?.slice(0, 45)}
                  </span>
                  <span
                    className={
                      "text-base font-semibold opacity-60 " +
                      (showMoreList[index] && "hidden")
                    }
                    onClick={() => handleShowMore(index)}
                  >
                    {items?.card?.info?.description &&
                      items?.card?.info?.description.length > 45 &&
                      "...more"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="relative w-5/12 md:w-3/12 pt-2 md:p-4 flex items-end">
            <div className="flex-shrink-0 min-h-20">
              {items.card.info.imageId && (
                <img
                  src={CUISINE_IMAGES_URL + items.card.info.imageId}
                  className="w-[150px] md:w-[130px] rounded-md h-[130px] md:h-[96px]"
                />
              )}
            </div>
            <div className="absolute bottom-0">
              <button
                className="p-2 mx-7 md:px-4 md:mx-5 w-[90px] h-[36px] bg-white shadow-lg text-green-600 text-xs font-bold rounded-lg uppercase font-montserrat"
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
