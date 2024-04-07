import RestaurantCard, { RestaurantCardOffer } from "./RestaurantCard.js";
import { useState, useEffect, useContext } from "react";
import HomePageShimmer from "./HomePageShimmer.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";
import ExploreRestaurants from "./ExploreRestaurants.js";
import {
  HOME_PAGE_API,
  MOBILE_HOME_PAGE_API,
  CUISINE_IMAGES_URL
} from "../utils/constants.js";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import Footer from "./Footer";

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
  const isMobile = window.innerWidth <= 768;

  const onlineStatus = useOnlineStatus();
  // const {listOfRestaurants, filteredRestaurants} = useRestaurantList();
  const RestaurantCardWithOffer = RestaurantCardOffer(RestaurantCard);

  const { loggedInUser, setUserName } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = isMobile ? MOBILE_HOME_PAGE_API : HOME_PAGE_API;
      const data = await fetch(url);
      const json = await data.json();

      if (isMobile) {
        console.log(
          "mobile data",
          json?.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle
            ?.restaurants
        );
        setFoodDeliveryHeading(
          json?.data?.success?.cards[4]?.gridWidget?.header?.title
        );
        setListOfRestaurants(
          json?.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle
            ?.restaurants
        );
        setFilteredRestaurants(
          json?.data?.success?.cards[4]?.gridWidget?.gridElements?.infoWithStyle
            ?.restaurants
        );
      } else {
        const cuisineListData = json?.data?.cards[0]?.card?.card;
        const restaurantChainsData = json?.data?.cards[1].card?.card;
        const foodDeliveryData = json?.data?.cards[2]?.card?.card;
        const facetListData = json?.data?.cards[3]?.card?.card;
        const listOfRestaurantsData = json?.data?.cards[4]?.card?.card;

        if (cuisineListData) {
          setCuisineList(
            json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
          );
          setCuisineListHeading(json?.data?.cards[0].card?.card?.header?.title);
        }

        if (restaurantChainsData) {
          setRestaurantChains(
            json?.data?.cards[1].card?.card?.gridElements?.infoWithStyle
              ?.restaurants
          );
          setRestaurantChainHeading(
            json?.data?.cards[1].card?.card?.header?.title
          );
        }

        if (foodDeliveryData) {
          setFoodDeliveryHeading(json?.data?.cards[2]?.card?.card?.title);
        }

        if (facetListData) {
          setFacetList(json?.data?.cards[3]?.card?.card?.facetList);
        }

        if (listOfRestaurantsData) {
          setListOfRestaurants(
            json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants
          );
          setFilteredRestaurants(
            json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants
          );
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
      const filteredList = listOfRestaurants.filter(
        (res) => res?.info?.sla?.deliveryTime < 30
      );
      setFilteredRestaurants(filteredList);
    },

    Offers: () => {
      const filteredList = listOfRestaurants.filter(
        (res) =>
          res?.info?.aggregatedDiscountInfoV3 &&
          res?.info?.aggregatedDiscountInfoV3?.header !== ""
      );
      setFilteredRestaurants(filteredList);
    },
  };

  //conditional rendering
  return listOfRestaurants.length === 0 ? (
    <HomePageShimmer />
  ) : (
    <div>
      <div className="body w-screen md:m-auto md:w-9/12">
        {/* <div className="filter flex items-center shadow-md">
          <div className="p-2 m-2">
            <label>Username:</label>
            <input
              className="border border-black"
              value={loggedInUser}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></input>
          </div>
        </div> */}

        <div className="hidden md:flex flex-col mt-4 mb-20">
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
                <div key={cuisines.id} className="w-[144px] cursor-pointer">
                  <img
                    className="w-full h-full"
                    src={CUISINE_IMAGES_URL + cuisines.imageId}
                    alt="cuisines"
                  ></img>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden top-brand md:flex flex-col mb-20">
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
                className="relative group"
              >
                {topBrand.info.aggregatedDiscountInfoV3 &&
                topBrand.info.aggregatedDiscountInfoV3.header !==
                  "FREE ITEM" ? (
                  <RestaurantCardWithOffer resData={topBrand} />
                ) : (
                  <RestaurantCard resData={topBrand} />
                )}
              </Link>
              // <div >{<RestaurantCard resData={topBrand} />}</div>
            ))}
          </div>
        </div>

        <div className="res-container flex flex-col md:mt-6">
          <div>
            <h2 className="font-montserrat font-extrabold text-xl opacity-90 m-4 md:mb-4">
              {foodDeliveryHeading}
            </h2>
          </div>

          <div className="filters hidden md:flex justify-between items-center">
            <div>
              <div className="flex m-4 gap-4">
                {facetList.map(
                  (facet) =>
                    facet?.label !== "Cuisines" &&
                    facet.label !== "Explore" && (
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

            <div className="search p-2 m-2 ml-4 relative">
              <input
                type="text"
                id="searchBar"
                className="p-3 rounded-xl bg-[#f5f0f0] w-[400px] h-[50px] font-montserrat"
                value={searchInput}
                data-testid="searchInput"
                placeholder="Search for restaurant and food"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
              <button
                id="searchButton"
                className="px-4 py-2 rounded-md absolute inset-y-0 right-0"
                onClick={() => {
                  const searchedRestaurants = listOfRestaurants.filter((res) =>
                    res.info.name
                      .toLowerCase()
                      .includes(searchInput.toLowerCase())
                  );
                  setFilteredRestaurants(searchedRestaurants);
                }}
              >
                <svg
                  width={20}
                  height={21}
                  viewBox="0 0 20 21"
                  fill="#02060c"
                  stroke="rgba(2, 6, 12, 0.6)"
                  opacity={0.5}
                >
                  <path
                    fillRule="evenodd"
                    d="M13.0998 8.84232C13.0998 11.7418 10.7493 14.0922 7.84989 14.0922C4.95046 14.0922 2.6 11.7418 2.6 8.84232C2.6 5.94289 4.95046 3.59243 7.84989 3.59243C10.7493 3.59243 13.0998 5.94289 13.0998 8.84232ZM12.1431 14.1802C10.9686 15.1261 9.47534 15.6922 7.84989 15.6922C4.0668 15.6922 1 12.6254 1 8.84232C1 5.05923 4.0668 1.99243 7.84989 1.99243C11.633 1.99243 14.6998 5.05923 14.6998 8.84232C14.6998 10.4974 14.1128 12.0153 13.1357 13.1993L18.319 17.9606C18.7226 18.3313 18.7359 18.9637 18.3483 19.3511C17.9634 19.7357 17.3365 19.7254 16.9645 19.3282L12.1431 14.1802Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:flex-wrap justify-start items-start md:items-center md:gap-2">
            {filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={"/restaurants/" + restaurant.info.id}
                className="relative group"
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
      <Footer />
    </div>
  );
};

export default Body;
