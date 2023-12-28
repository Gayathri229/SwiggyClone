import { useEffect,useState } from "react";
import { RESTAURANT_LIST } from "./constants";

const useRestaurantList = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurantList();
  }, []);

  const fetchRestaurantList = async () => {
    try {
      const data = await fetch(RESTAURANT_LIST);
      const json = await data.json();
      setListOfRestaurants(
        json?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards
      );
      setFilteredRestaurants(
        json?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards
      );
    } catch (err) {
      console.log(err);
    }
  };

  return {listOfRestaurants, filteredRestaurants};
};


export default useRestaurantList;