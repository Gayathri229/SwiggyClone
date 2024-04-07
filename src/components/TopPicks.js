import { CDN_URL } from "../utils/constants";

const TopPicks = ({ header, restaurants }) => {
  return (
    <div className="m-3">
      <div className="flex items-center m-2 mb-4">
        <div className="w-[20px] h-[20px] mr-2">
          <img src={CDN_URL + header?.imageId} alt="top-picks"/>
        </div>
        <p className="font-extrabold font-montserrat text-xl opacity-80">
          {header?.title}
        </p>
      </div>
      <div className="flex overflow-x-scroll scrollbar-hide">
        {restaurants &&
          restaurants.map((restaurant) => (
            <div key={restaurant?.id} className="m-1">
              <div className="w-[80px] h-[80px]">
                <img
                  src={CDN_URL + restaurant?.info?.cloudinaryImageId}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <p className="font-montserrat text-sm line-clamp-2 opacity-90">
                {restaurant?.info?.name}
              </p>
              <p className="font-montserrat text-sm opacity-70">
                {restaurant?.info?.sla?.slaString}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopPicks;
