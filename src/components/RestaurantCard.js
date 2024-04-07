import { CDN_URL } from "../utils/constants.js";
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
      className="res-card flex md:inline-block m-3 md:w-[250px] rounded-2xl transition-transform group-hover:scale-95"
      data-testid="resCard"
    >
      <div className="relative flex-shrink-0 w-[105px] h-[96px] md:w-[250px] md:h-[190px]">
        <img
          className="absolute res-logo rounded-2xl w-full h-full object-cover"
          alt="restaurant-image"
          src={CDN_URL + cloudinaryImageId}
        />
        {/* <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: `url(${CDN_URL + cloudinaryImageId})`}}></div> */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90 rounded-2xl"></div>
      </div>
      <div className="ml-4 md:ml-2 md:mt-3">
        <h3 className="font-spaceGrotesk font-semibold text-sm md:text-lg line-clamp-1 md:truncate md:line-clamp-none opacity-70">
          {name}
        </h3>
        <div className="flex items-center gap-1">
          <img
            className="w-[17px] h-[17px]"
            src={GREEN_STAR}
            alt="green-star"
          />
          <span className="font-montserrat text-sm md:text-base font-bold tracking-tight opacity-70">
            {avgRating} {"•"} {sla.slaString}
          </span>
        </div>
        <p className="font-spaceGrotesk font-thin opacity-70 text-sm md:text-base line-clamp-1 md:truncate md:line-clamp-none">
          {cuisines.join(", ")}
        </p>
        <p className="font-spaceGrotesk opacity-70 text-sm md:text-base">
          {areaName}
        </p>
        {/* <p className="font-spaceGrotesk opacity-70">{costForTwo}</p> */}
      </div>
    </div>
  );
};

// Higher order component
export const RestaurantCardOffer = (RestaurantCard) => {
  const isMobile = window.innerWidth <= 768;
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
              <div
                className={
                  "absolute font-montserrat tracking-[-0.9px] top-[80px] md:top-[170px] left-8 md:left-5 text-[#ed5e0e] md:text-white opacity-90 font-extrabold text-[10px] md:text-xl group-hover:scale-95 transition-transform " +
                  (isMobile &&
                    "bg-white rounded-sm p-1 text-center shadow-sm shadow-black ")
                }
              >
                {resData?.info?.aggregatedDiscountInfoV3?.header}{" "}
                {isMobile && <br />}
                <span className={(isMobile && "text-[9px]")}>
                  {resData?.info?.aggregatedDiscountInfoV3?.subHeader &&
                    resData?.info?.aggregatedDiscountInfoV3?.subHeader}
                </span>
              </div>
            )}
          </>
        }
      </>
    );
  };
};

export default RestaurantCard;
