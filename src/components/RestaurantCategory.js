import { useState } from "react";
import MenuItems from "./MenuItems";
import { IoIosArrowDown } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const RestaurantCategory = ({ categoryMenu, showItems, setShowIndex }) => {

  const handleClick = () => {
    setShowIndex();
  };



  return (
    <div>
     

      <div className="accordion-header w-11/12 mx-auto my-2 p-3">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={handleClick}
        >
          <span className="font-bold text-[16px] font-montserrat opacity-80">
            {categoryMenu.title} ({categoryMenu.itemCards.length})
          </span>
          <span>
            {showItems ? (
              <SlArrowUp size={16} className="m-2"/>
            ) : (
              <SlArrowDown size={16} className="m-2" />
            )}
          </span>
        </div>

        <div className="w-full">
          {showItems && <MenuItems itemList={categoryMenu?.itemCards} />}
        </div>

        <hr className="h-[16px] bg-[#f1f1f6]"/>

      </div>
    </div>
  );
};

export default RestaurantCategory;
