// Body.js
import RestaurantCard from "./RestaurantCard.js";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import useRestaurantData from "./useRestaurantData.js";

const Body = () => {
  const [searchInput, setSearchInput] = useState("");
  const onlineStatus = useOnlineStatus();
  const { listOfRestaurants, filteredRestaurants, fetchData } = useRestaurantData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline. Please check your internet connection!
      </h1>
    );

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            id="searchBar"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button
            id="searchButton"
            onClick={() => {
              const searchedRestaurants = listOfRestaurants.filter((res) =>
                res.card.card.info.name
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
              );
              setFilteredRestaurants(searchedRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.card.card.info.avgRating > 4
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.card.card.info.id}
            to={"/restaurants/" + restaurant.card.card.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;



.header {
  display: flex;
  justify-content: space-between;
  margin: 30px;
  border: 1px solid black;
}

.logo {
  height: 90px;
}

.nav-items > ul {
  display: flex;
  list-style-type: none;
  padding: 0px 20px;
  /* margin-top: 23px; */
}

.nav-items > ul > li {
  padding: 10px;
  margin: 10px;
  font-size: 18px;

}

.nav-items > ul > li > a {
  text-decoration: none;
  color: black;
}


.res-container {
  display: flex;
  flex-wrap: wrap;
}

.res-container > a {
  text-decoration: none;
  color: black;
}

.res-card {
  /* height: 350px; */
  width: 200px;
  padding: 5px;
  margin: 10px;
  border-radius: 10px;
}

.res-card:hover {
  /* border: 1px solid black; */
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.res-logo {
  width: 100%;
  border-radius: 10px;
}

.search {
  padding: 10px;
}

.filter-btn {
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
}

#searchBar {
  margin: 5px;
  padding: 5px;
}

#searchButton {
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  background-color: aliceblue;
}

.shimmer-container {
  display: flex;
  flex-wrap: wrap;
}

.shimmer-card {
  margin: 10px;
  padding: 10px;
  width: 200px;
  height: 300px;
  border-radius: 10px;
  background-color: #f0f0f0;
}

.login-btn {
  padding: 0 10px;
  width: 60px;
}

.filter {
  display: flex;
}

.menu {
  box-sizing: border-box;
  margin: 80px;
}

.restaurant-header {
  font-family: 'Nunito Sans', sans-serif;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  margin: 10px;
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.restaurant-header-left {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.restaurant-name {
  font-weight: 600;
  font-size: 30px;
  margin: 0px 0px 10px 0px;
}

.restaurant-cuisines, .cost-for-two {
  margin: 10px 0px;
}

.menu-items{
  border-radius: 10px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  margin: 10px;
  padding: 10px 40px;
  background-color: #F5F5F5;
}

.menu-items h2, .menu-items h3 {
  font-family: 'Nunito Sans', sans-serif;
  margin-left: 20px;
}

ul {
  list-style-type: none;
}

.items-list {
  margin: 10px;
  padding: 10px;
}

.item-name, .item-price{
  font-family: 'Poppins', sans-serif;
}

.item-description {
  font-family: 'Lato', sans-serif;
  font-weight: lighter;
  color: #B0A695;
  font-size: 14px;
}

.restaurant-rating {
  text-align: center;
  box-sizing: border-box;
  border: 0.5px solid #BFB29E; 
  /* EBE3D5 */
  border-radius: 5px;
  padding: 10px 0px;
}

.rating-div{
  margin-right: 10px;
}

.rating-icon img {
  width: 20px;
  margin-right: 3px;
  /* margin-top: 2px; */
}

.rating {
  color: green;
  font-size: 18px;
  /* margin: 0px 0px 5px 0px; */
}


.total-ratings > p{
  margin: 10px;
}




