import { useState } from "react";
import MenuItems from "./MenuItems";
import { IoIosArrowDown } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

export const RestaurantCategory = ({
  categoryMenu,
  isVeg,
  showItems,
  setShowIndex,
}) => {
  const handleClick = () => {
    setShowIndex();
  };

  const menuLength = isVeg
    ? categoryMenu?.itemCards?.filter(
        (items) => items?.card?.info?.itemAttribute?.vegClassifier === "VEG"
      )?.length
    : categoryMenu?.itemCards?.length;

  return (
    <div>
      {console.log("in res category")}
      {menuLength !== 0 && (
        <div className="accordion-header w-screen md:w-11/12 md:mx-auto my-2 p-3">
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={handleClick}
          >
            <span className="font-bold text-[16px] font-montserrat opacity-80">
              {menuLength !== 0 && (
                <>
                  {categoryMenu.title} ({menuLength})
                </>
              )}
            </span>
            <span>
              {showItems ? (
                <SlArrowUp size={16} className="m-2" />
              ) : (
                <SlArrowDown size={16} className="m-2" />
              )}
            </span>
          </div>

          <div className="w-full">
            {isVeg
              ? showItems && (
                  <MenuItems
                    itemList={categoryMenu?.itemCards?.filter(
                      (items) =>
                        items?.card?.info?.itemAttribute?.vegClassifier ===
                        "VEG"
                    )}
                  />
                )
              : showItems && <MenuItems itemList={categoryMenu?.itemCards} />}
          </div>

          <hr className="h-[16px] bg-[#f1f1f6]" />
        </div>
      )}
    </div>
  );
};

// export default {RestaurantCategory, VegMenu};
