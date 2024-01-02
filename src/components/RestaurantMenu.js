import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { RATING } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { RestaurantCategory } from "./RestaurantCategory";
import { useState } from "react";
import ReactSwitch from "react-switch";
import { MdTimelapse } from "react-icons/md";
import { TbCoinRupee } from "react-icons/tb";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);
  const [isVegOnly, setVegOnlyValue] = useState(false);

  if (resInfo === null) return <Shimmer />;

  const {
    name,
    costForTwoMessage,
    cuisines,
    avgRating,
    totalRatingsString,
    locality,
    sla,
  } = resInfo?.cards[0]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (category) =>
        category?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  const handleToggle = () => {
    setVegOnlyValue(!isVegOnly);
  };

  return (
    <div className="menu text-center w-7/12 m-auto">
      <div className="restaurant-header flex justify-between m-4 p-7">
        <div className="restaurant-header-left flex flex-col items-start m-5">
          <p className="restaurant-name font-bold font-montserrat text-lg mb-2">
            {name}
          </p>
          <p className="restaurant-cuisines font-spaceGrotesk mb-1 text-sm opacity-50 leading-tight">
            {cuisines.join(", ")}
          </p>
          <p className="font-spaceGrotesk mb-1 text-sm opacity-50 leading-tight">
            {locality}, {sla.lastMileTravelString}
          </p>
        </div>
        <div className="restaurant-rating border border-solid border-gray-300 rounded-md w-[75px] h-[75px] flex flex-col justify-center items-center m-4 border-opacity-50">
          <div className="rating-div flex justify-center items-center mb-1">
            <span className="rating-icon">
              <img
                src={RATING}
                alt="rating-image"
                className="w-[16px] m-1 mb-2"
              ></img>
            </span>
            <span className="rating text-green-800 font-extrabold font-montserrat text-sm pb-1 mt-[3px]">
              {avgRating}
            </span>
          </div>
          <hr className="bg-black w-[80%] h-[2px] opacity-10" />
          <div className="total-ratings font-bold font-spaceGrotesk text-xs opacity-60 tracking-tighter mt-[9px]">
            <p>{totalRatingsString}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {/* <hr className="bg-black w-[88%] h-[2px] opacity-10" /> */}
        <svg width="800" height="20" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
          <line
            x1="10"
            y1="10"
            x2="890"
            y2="10"
            stroke="black"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        </svg>
      </div>

      <div className="flex ml-12 my-6 opacity-80">
        <div className="flex mr-6">
          <MdTimelapse size={22} className="mr-1" />
          <span className="font-montserrat font-extrabold text-sm">
            {sla.deliveryTime} MINS
          </span>
        </div>
        <div className="flex">
          <HiOutlineCurrencyRupee size={22} className="mr-1" />
          <span className="font-montserrat font-extrabold text-sm">
            {costForTwoMessage}
          </span>
        </div>
      </div>

      {/* <div className="flex justify-center">
        <hr className="bg-black w-[88%] h-[2px] opacity-10" />
      </div> */}

      <div className="veg-filter flex justify-start ml-12 my-6 ">
        <p className="mr-3 font-montserrat text-sm font-bold opacity-70">
          Veg Only
        </p>
        <div className="opacity-60">
          <ReactSwitch
            height={19}
            width={40}
            uncheckedIcon={false}
            checkedIcon={false}
            borderRadius={4}
            checked={isVegOnly}
            onChange={handleToggle}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <hr className="bg-black w-[88%] h-[1px] opacity-10" />
      </div>

      <div className="restaurant-menu">
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.title}
            categoryMenu={category?.card?.card}
            isVeg={isVegOnly}
            showItems={index === showIndex ? true : false}
            // setShowIndex = {() => setShowIndex(index)}
            setShowIndex={() => {
              index === showIndex ? setShowIndex(null) : setShowIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
