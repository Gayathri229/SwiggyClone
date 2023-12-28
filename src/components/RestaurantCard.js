import { CDN_URL } from "../utils/constants.js";
import GreenStar from "../../images/Green_star.svg";
import { GREEN_STAR } from "../utils/constants.js";

const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    cuisines,
    costForTwo,
    avgRating,
    sla,
    areaName,
  } = resData?.info;
  return (
    <div
      className="res-card m-3 w-[280px] rounded-2xl hover:bg-gray-200 hover:shadow-lg"
      data-testid="resCard"
    >
      <div className="relative">
        <img
          className="res-logo rounded-2xl w-[280px] h-[190px]"
          alt="restaurant-image"
          src={CDN_URL + cloudinaryImageId}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90 rounded-2xl"></div>
      </div>
      <div className="ml-2 mt-3">
        <h3 className="font-spaceGrotesk font-semibold text-lg truncate opacity-70">{name}</h3>
        <div className="flex items-center gap-1">
          <img
            className="w-[17px] h-[17px]"
            src={GREEN_STAR}
            alt="green-star"
          />
          <span className="font-montserrat font-bold tracking-tight opacity-70">
            {avgRating} {"•"} {sla.slaString}
          </span>
        </div>
        <p className="font-spaceGrotesk font-thin opacity-70 text-ellipsis overflow-hidden truncate">
          {cuisines.join(", ")}
        </p>
        <p className="font-spaceGrotesk opacity-70">{areaName}</p>
        {/* <p className="font-spaceGrotesk opacity-70">{costForTwo}</p> */}
      </div>
    </div>
  );
};

// Higher order component
export const RestaurantCardOffer = (RestaurantCard) => {
  // here it returns another component
  return (props) => {
    // actual jsx
    const { resData } = props;

    return (
      <>
        <RestaurantCard {...props} />
        {
          <>
            {resData?.info?.aggregatedDiscountInfoV3 && (
              <div className="absolute font-montserrat tracking-[-0.5px] top-[170px] left-7 text-white opacity-90 font-extrabold text-xl">
                {resData?.info?.aggregatedDiscountInfoV3?.header}{" "}
                {resData?.info?.aggregatedDiscountInfoV3?.subHeader &&
                  resData?.info?.aggregatedDiscountInfoV3?.subHeader}
              </div>
            )}
          </>
        }
      </>
    );
  };
};

export default RestaurantCard;
