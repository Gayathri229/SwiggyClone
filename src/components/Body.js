import RestaurantCard, { RestaurantCardOffer } from "./RestaurantCard.js";
import { useState, useEffect, useContext } from "react";
import HomePageShimmer from "./HomePageShimmer.js";
import { Link, json } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";
// import useRestaurantList from "../utils/useRestaurantList.js";
import ExploreRestaurants from "./ExploreRestaurants.js";
import {
  CUISINE_IMAGES_URL,
  GOOGLE_PLAY_BANNER,
  APP_STORE_BANNER,
} from "../utils/constants.js";
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
      <div className="body m-auto w-10/12">
        <div className="filter flex items-center shadow-md">
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

        <div className="res-container flex flex-col mt-6">
          <div>
            <h2 className="font-montserrat font-extrabold text-xl opacity-90 mb-4">
              {foodDeliveryHeading}
            </h2>
          </div>

          <div className="filters flex justify-between items-center">
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

          <div className="flex flex-wrap justify-start items-center gap-2">
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
      <div className="footer w-full mt-12">
        <div className="app-experience flex justify-center bg-[#f0f0f5] h-[110px] w-full">
          <p className="font-spaceGrotesk font-extrabold text-[28px] opacity-70 mr-24 mt-4">
            For better experience,download <br /> the Swiggy app now
          </p>
          <Link to="https://play.google.com/store/apps/details?id=in.swiggy.android&referrer=utm_source%3Dswiggy%26utm_medium%3Dheader">
            <img
              src={GOOGLE_PLAY_BANNER}
              alt="google-play-banner"
              className="h-[64px] w-[208px] mt-6 mr-6"
            />
          </Link>
          <Link to="https://apps.apple.com/in/app/swiggy-food-grocery-delivery/id989540920?referrer=utm_source%3Dswiggy%26utm_medium%3Dhomepage">
            <img
              src={APP_STORE_BANNER}
              alt="app-store-banner"
              className="h-[64px] w-[208px] mt-6"
            />
          </Link>
        </div>
        <div className="bg-[#02060C] h-[450px] w-full">
          <div className="cols flex justify-center gap-[130px]">
            <div className="col-1 flex flex-col mt-12 gap-3">
              <div className="flex items-center">
                <span>
                  <svg width={21} height={32} viewBox="0 0 21 32">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.3819 14.7977C20.5245 13.9563 20.3574 13.3121 19.9261 12.9756C19.2787 12.4711 18.3021 12.1959 15.9859 12.204C14.2724 12.2082 12.4327 12.2167 11.6469 12.2205C11.5739 12.2082 11.3093 12.1181 11.297 11.7938L11.2683 6.64781C11.2683 6.3236 11.5207 6.05694 11.8385 6.05694C12.1559 6.05694 12.412 6.31936 12.412 6.64358C12.412 6.64358 12.4285 9.43839 12.4327 10.4314C12.4327 10.5257 12.4897 10.7513 12.7011 10.8089C14.085 11.1822 21.0778 10.883 20.9639 9.57764C20.3536 4.16496 15.8884 -0.0164585 10.4829 4.87055e-05C8.78164 0.00385807 7.16965 0.426698 5.745 1.16952C2.33815 2.98744 -0.0755529 6.63977 0.00180748 10.8542C0.0546894 13.8374 1.98811 19.1396 3.16037 19.923C3.70173 20.2845 4.40996 20.1491 7.58886 20.1368C9.0298 20.1325 10.3732 20.1325 11.0324 20.1325C11.1016 20.1448 11.4599 20.2312 11.4637 20.5677L11.484 24.4782C11.484 24.8024 11.232 25.0691 10.9142 25.0691C10.5968 25.0691 10.3402 24.8109 10.3402 24.4824C10.3402 24.4824 10.3647 22.9108 10.3609 22.328C10.3609 22.1926 10.3689 21.9585 9.98235 21.7862C8.71622 21.2119 4.60532 21.5729 4.37737 22.2129C4.29191 22.4592 4.75185 23.4073 5.46418 24.6259C7.83331 28.4425 10.1571 31.4176 10.5318 31.8937C10.5563 31.9141 10.5766 31.9348 10.5968 31.9471C10.9104 31.5611 19.1078 22.2747 20.3819 14.7977Z"
                      fill="white"
                    ></path>
                  </svg>
                </span>
                <div className="text-white font-extrabold text-2xl font-spaceGrotesk ml-2 opacity-90">
                  Swiggy
                </div>
              </div>

              <div className="font-spaceGrotesk text-white text-sm opacity-70">
                © 2023 Bundl Technologies <br /> Pvt. Ltd
              </div>
            </div>

            <div className="col-2 mt-12">
              <ul className="font-spaceGrotesk text-white text-base flex flex-col gap-4 cursor-pointer">
                <li className="font-bold opacity-90 text-lg">Company</li>
                <li className="opacity-70">About</li>
                <li className="opacity-70">Careers</li>
                <li className="opacity-70">Team</li>
                <li className="opacity-70">Swiggy One</li>
                <li className="opacity-70">Swiggy Instamart</li>
                <li className="opacity-70">Swiggy Genie</li>
              </ul>
            </div>

            <div className="col-3 flex flex-col mt-12 gap-20">
              <div>
                <ul className="font-spaceGrotesk text-white text-base flex flex-col gap-4 cursor-pointer">
                  <li className="font-bold text-lg opacity-90">Contact Us</li>
                  <li className="opacity-70">Help & Support</li>
                  <li className="opacity-70">Partner with us</li>
                  <li className="opacity-70">Ride with us</li>
                </ul>
              </div>
              <div className="col-3">
                <ul className="font-spaceGrotesk text-white text-base flex flex-col gap-4 cursor-pointer">
                  <li className="font-bold text-lg opacity-90">Legal</li>
                  <li className="opacity-70">Terms & Conditions</li>
                  <li className="opacity-70">Cookie Policy</li>
                  <li className="opacity-70">Privacy Policy</li>
                </ul>
              </div>
            </div>

            <div className="col-4 mt-12">
              <ul className="font-spaceGrotesk text-white text-base flex flex-col gap-4 cursor-pointer">
                <li className="font-bold text-lg opacity-90">We deliver to:</li>
                <li className="opacity-70">Bangalore</li>
                <li className="opacity-70">Gurgaon</li>
                <li className="opacity-70">Hyderabad</li>
                <li className="opacity-70">Delhi</li>
                <li className="opacity-70">Mumbai</li>
                <li className="opacity-70">Pune</li>
                <li className="opacity-70">& 589 more cities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
