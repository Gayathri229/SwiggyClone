import { useState } from "react";
import MenuItems from "./MenuItems";

const RestaurantCategory = ({ categoryMenu, showItems, setShowIndex }) => {

  const handleClick = () => {
    setShowIndex();
  }

  return (
    <div>
      <div className="accordion-header w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
        <div className="flex justify-between cursor-pointer" onClick={handleClick}>
          <span className="font-bold text-lg">
            {categoryMenu.title} ({categoryMenu.itemCards.length})
          </span>
          <span>⬇️</span>
        </div>
        <div className="w=6/12">
          {showItems && <MenuItems itemList={categoryMenu?.itemCards} />}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCategory;
