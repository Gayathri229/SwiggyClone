import { useEffect, useState } from "react";
import { MENU_API, MOBILE_MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = isMobile ? MOBILE_MENU_API + resId : MENU_API + resId;
    const data = await fetch(url);
    const json = await data.json();
    setResInfo(json.data);
  };

  return resInfo;
};

export default useRestaurantMenu;
