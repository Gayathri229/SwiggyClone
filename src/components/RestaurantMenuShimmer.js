const RestaurantMenuShimmer = () => {
  return (
    <div className="restaurant-menu-shimmer w-7/12 m-auto flex flex-col justify-center">
      <div className="flex items-center justify-center">
        <div className="bg-gray-200 w-11/12 h-3"></div>
      </div>
      <div className="m-2">
        <div className="w-32 h-2 my-6 ml-10 bg-gray-200 shimmer-effect"></div>
        <div className="flex gap-6 justify-center">
          <div className="flex flex-col items-start justify-center gap-1">
            <div className="shimmer-card w-[380px] h-[200px] bg-gray-200 shimmer-effect"></div>
            <div className="bg-gray-200 w-[135px] h-2 mt-2 shimmer-effect"></div>
            <div className="bg-gray-200 w-[70px] h-[6px] mt-2 shimmer-effect"></div>
            <div className="bg-gray-200 w-[55px] h-[5px] mt-2 shimmer-effect"></div>
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <div className="shimmer-card w-[380px] h-[200px] bg-gray-200 shimmer-effect"></div>
            <div className="bg-gray-200 w-[135px] h-2 mt-2 shimmer-effect"></div>
            <div className="bg-gray-200 w-[70px] h-[6px] mt-2 shimmer-effect"></div>
            <div className="bg-gray-200 w-[50px] h-[5px] mt-2 shimmer-effect"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenuShimmer;
