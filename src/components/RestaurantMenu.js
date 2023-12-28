import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { RATING } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const { name, costForTwoMessage, cuisines, avgRating, totalRatingsString } =
    resInfo?.cards[0]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (category) =>
        category?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="menu text-center">
      <div className="restaurant-header flex justify-between items-center bg-gray-100 shadow-lg m-4 p-7 font-nunito">
        <div className="restaurant-header-left flex flex-col m-5">
          <p className="restaurant-name font-bold my-6 text-2xl">{name}</p>
          <p className="restaurant-cuisines my-2 text-lg">
            {cuisines.join(", ")}
          </p>
          <p className="cost-for-two my-2">{costForTwoMessage}</p>
        </div>
        <div className="restaurant-rating border border-solid border-gray-300 rounded-md w-[102px] h-24 flex flex-col justify-center items-center m-4">
          <div className="rating-div flex justify-center items-center">
            <span className="rating-icon">
              <img
                src={RATING}
                alt="rating-image"
                className="w-[18px] m-1 mb-2"
              ></img>
            </span>
            <span className="rating text-green-800 font-extrabold">
              {avgRating}
            </span>
          </div>
          <div className="total-ratings font-medium text-gray-400">
            <p>{totalRatingsString}</p>
          </div>
        </div>
      </div>

      <div className="restaurant-menu">
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.title}
            categoryMenu={category?.card?.card}
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
