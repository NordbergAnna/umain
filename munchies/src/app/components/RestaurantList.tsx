import { useEffect, useState } from "react";
import { Restaurant } from "../types";
import { fetchRestaurants } from "../lib/api";
import RestaurantCard from "./RestaurantCard";

interface RestaurantsListProps {
  filters: string[];
  deliveryTimes: number[];
  priceRanges: string[];
}

const RestaurantsList = ({ filters, deliveryTimes, priceRanges }: RestaurantsListProps) => {
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
    let filtered = [...allRestaurants];

    if (filters.length) {
      filtered = filtered.filter((r) => r.filter_ids.some((id) => filters.includes(id)));
    }

    if (deliveryTimes.length) {
      filtered = filtered.filter((r) =>
        deliveryTimes.some((time) => r.delivery_time_minutes <= time)
      );
    }

    if (priceRanges.length) {
      filtered = filtered.filter((r) => priceRanges.includes(r.price_range_id));
    }

    setRestaurants(filtered);
  }, [filters, deliveryTimes, priceRanges, allRestaurants]);

  return (
    <div className="col-span-12 max-md:mt-6">
      <h1 className="text-display">Restaurant’s</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[17px] mt-5 md:mt-8">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantsList;
