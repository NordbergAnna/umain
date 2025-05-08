import { useEffect, useState } from "react";
import { Restaurant } from "../../types";
import { fetchRestaurants } from "../../lib/api";
import RestaurantCard from "./RestaurantCard";
import { filterRestaurants } from "@/app/hooks/filterUtils";
import type { RestaurantsListProps } from "../../types";

const RestaurantsList = ({ foodCategories, deliveryTimes, priceRanges }: RestaurantsListProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const loadRestaurants = async () => {
      const resList = await fetchRestaurants();
      setAllRestaurants(resList);
    };
    loadRestaurants();
  }, []);

  useEffect(() => {
    const filtered = filterRestaurants(allRestaurants, foodCategories, deliveryTimes, priceRanges);
    setRestaurants(filtered);
  }, [foodCategories, deliveryTimes, priceRanges, allRestaurants]);

  return (
    <div className="col-span-12 max-md:pr-6 max-md:pb-[40px] max-md:mt-6">
      <h1 className="text-display">Restaurant’s</h1>
      {restaurants.length === 0 ? (
        <div className="grid grid-cols-12 items-center justify-center min-h-[300px]">
            <p className="text-display col-span-6">Oops.. Looks like there's no food on the menu for these filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[17px] mt-5 md:mt-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantsList;
