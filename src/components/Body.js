import RestaurantCard, { RestaurantCardOffer } from "./RestaurantCard.js";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer.js";
import { Link, json } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";
// import useRestaurantList from "../utils/useRestaurantList.js";
import ExploreRestaurants from "./ExploreRestaurants.js";
import { CUISINE_IMAGES_URL } from "../utils/constants.js";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [foodDeliveryHeading, setFoodDeliveryHeading] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [cuisineList, setCuisineList] = useState([]);
  const [cuisineListHeading, setCuisineListHeading] = useState([]);
  const [restaurantChains, setRestaurantChains] = useState([]);
  const [restaurantChainHeading, setRestaurantChainHeading] = useState("");
  const [facetList, setFacetList] = useState([]);

  const onlineStatus = useOnlineStatus();
  // const {listOfRestaurants, filteredRestaurants} = useRestaurantList();
  const RestaurantCardWithOffer = RestaurantCardOffer(RestaurantCard);

  const { loggedInUser, setUserName } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      setFoodDeliveryHeading(json?.data?.cards[2]?.card?.card?.title);
      setListOfRestaurants(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setFilteredRestaurants(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );

      setCuisineList(
        json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
      );
      setCuisineListHeading(json?.data?.cards[0].card?.card?.header?.title);

      setRestaurantChains(
        json?.data?.cards[1].card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setRestaurantChainHeading(json?.data?.cards[1].card?.card?.header?.title);

      setFacetList(json?.data?.cards[3]?.card?.card?.facetList);
    } catch (err) {
      console.log(err);
    }
  };

  //conditional rendering ->
  //   if (listOfRestaurants.length === 0) {
  //     return <Shimmer />;
  //   }

  if (onlineStatus === false)
    return (
      <h1>Looks like you're offline. Please check your internet connection!</h1>
    );

  const cuisineSlideLeft = () => {
    var slider = document.getElementById("cuisineSlider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const cuisineSlideRight = () => {
    var slider = document.getElementById("cuisineSlider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const restaurantSlideLeft = () => {
    var slider = document.getElementById("restaurantChainSlider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const restaurantSlideRight = () => {
    var slider = document.getElementById("restaurantChainSlider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const functionMap = {
    Ratings: () => {
      const filteredList = listOfRestaurants.filter(
        (res) => res.info.avgRating > 4.5
      );
      setFilteredRestaurants(filteredList);
    },

    "Veg/Non-Veg": () => {
      const filteredList = listOfRestaurants.filter(
        (res) => res?.info?.veg && res?.info?.veg === true
      );
      setFilteredRestaurants(filteredList);
    },

    "Cost for two": () => {
      const filteredList = listOfRestaurants.filter((res) => {
        const price = res?.info?.costForTwo?.substring(1, 4);
        if (price >= "300" && price <= "600") return price;
      });
      setFilteredRestaurants(filteredList);
    },

    "Delivery Time": () => {
      const filteredList = listOfRestaurants.filter((res) => (
        res?.info?.sla?.deliveryTime < 30
      ));
      setFilteredRestaurants(filteredList);
    },

    "Offers": () => {
      const filteredList = listOfRestaurants.filter((res)=> (
        res?.info?.aggregatedDiscountInfoV3 && res?.info?.aggregatedDiscountInfoV3?.header !== ""
      ));
      setFilteredRestaurants(filteredList);
    }
  };

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body m-auto w-10/12">
      <div className="filter flex items-center shadow-md">
        <div className="search p-2 m-2 ml-4">
          <input
            type="text"
            id="searchBar"
            className="border border-solid border-black p-1 rounded-sm"
            value={searchInput}
            data-testid="searchInput"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button
            id="searchButton"
            className="px-4 py-2 bg-green-100 m-4 rounded-md"
            onClick={() => {
              const searchedRestaurants = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchInput.toLowerCase())
              );
              setFilteredRestaurants(searchedRestaurants);
            }}
          >
            Search
          </button>
        </div>
        {/* <div className="p-2 m-2">
          <button
            className="filter-btn bg-gray-100 px-4 py-2 m-2 rounded-md"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.5
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div> */}
        {/* <div className="p-2 m-2">
          <label>Username:</label>
          <input className="border border-black" value={loggedInUser} onChange={(e)=> {
            setUserName(e.target.value)
          }}></input>
        </div> */}
      </div>

      <div className="flex flex-col mt-4 mb-20">
        <div className="font-bold flex justify-between items-center">
          <h2 className="font-montserrat font-extrabold text-xl opacity-90">
            {cuisineListHeading}
          </h2>
          <div className="flex">
            <IoArrowBackCircle
              className="m-1 opacity-30 hover:opacity-80 cursor-pointer"
              onClick={cuisineSlideLeft}
              size={35}
            />
            <IoArrowForwardCircle
              className="m-1 opacity-30 hover:opacity-80 cursor-pointer"
              onClick={cuisineSlideRight}
              size={35}
            />
          </div>
        </div>

        <div
          className="slider flex scroll overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
          id="cuisineSlider"
        >
          <div className="flex gap-4 px-4">
            {cuisineList.map((cuisines) => (
              <div key={cuisines.id} className="w-[144px]">
                <img
                  className="w-full h-full"
                  src={CUISINE_IMAGES_URL + cuisines.imageId}
                  alt="cuisines"
                ></img>
                {/* <p>{cuisines.action.text}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="top-brand flex flex-col mb-20">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-montserrat font-extrabold text-xl opacity-90">
            {restaurantChainHeading}
          </h2>
          <div className="flex">
            <IoArrowBackCircle
              className="m-1 opacity-30 hover:opacity-80 cursor-pointer"
              onClick={restaurantSlideLeft}
              size={35}
            />
            <IoArrowForwardCircle
              className="m-1 opacity-30 hover:opacity-80 cursor-pointer"
              onClick={restaurantSlideRight}
              size={35}
            />
          </div>
        </div>
        <div
          className="flex scroll overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
          id="restaurantChainSlider"
        >
          {restaurantChains.map((topBrand) => (
            <Link
              key={topBrand.info.id}
              to={"/restaurants/" + topBrand.info.id}
              className="relative"
            >
              {topBrand.info.aggregatedDiscountInfoV3 &&
              topBrand.info.aggregatedDiscountInfoV3.header !== "FREE ITEM" ? (
                <RestaurantCardWithOffer resData={topBrand} />
              ) : (
                <RestaurantCard resData={topBrand} />
              )}
            </Link>
            // <div >{<RestaurantCard resData={topBrand} />}</div>
          ))}
        </div>
      </div>

      <div className="res-container flex flex-col mt-6">
        <div>
          <h2 className="font-montserrat font-extrabold text-xl opacity-90 mb-4">
            {foodDeliveryHeading}
          </h2>
        </div>

        <div className="filters">
          <div className="flex m-4 gap-4">
            {facetList.map(
              (facet) =>
                facet?.label !== "Cuisines" && (
                  <div
                    key={facet?.id}
                    className="p-2 border border-black rounded-3xl border-opacity-30 cursor-pointer active:bg-orange-400"
                  >
                    <button
                      className="font-spaceGrotesk opacity-80"
                      onClick={functionMap[facet?.label]}
                    >
                      {facet?.facetInfo[0]?.label}
                    </button>
                  </div>
                )
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-start items-center gap-2">
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
              className="relative"
            >
              {restaurant?.info?.aggregatedDiscountInfoV3 ? (
                <RestaurantCardWithOffer resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* <ExploreRestaurants /> */}
    </div>
  );
};

export default Body;
