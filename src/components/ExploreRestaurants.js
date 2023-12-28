import { useState } from "react";

const ExploreRestaurants = () => {

    const [restaurants, setRestaurants] = useState({});

    const loadRestaurants = async () => {
        try {
            const latitude = 12.9351929;
            const longitude = 77.62448069999999;
            const nextOffset =  "COVCELQ4KIDYoeie2vzmUjCnEzgE";
    
            const response = await fetch('https://www.swiggy.com/dapi/restaurants/list/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lat: latitude,
                    lng: longitude,
                    nextOffset: nextOffset,
                }),
            });
    
            const data = await response.json();
            console.log("LOAD RES", data);
            // setRestaurants(data);
        }catch(error) {
            console.error('Error fetching data:', error);
        }
       
    }


  return (
    <div>
      <button onClick={loadRestaurants} className="bg-orange-400 p-2 m-2 rounded-lg">
        Explore more restaurants
      </button>
    </div>
  );
};


export default ExploreRestaurants;