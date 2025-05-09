import { useEffect, useState } from "react";
import { Restaurant } from "../types";
import { fetchRestaurants, fetchOpenStatus } from "../lib/api";
import RestaurantCard from "../components/RestaurantCard";
import { filterRestaurants } from "@/app/hooks/filterUtils";
import type { RestaurantsListProps } from "../types";

/** Functional component to display a list of restaurants based on filters */
const RestaurantsList = ({
  foodCategories,
  deliveryTimes,
  priceRanges,
}: RestaurantsListProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // State to store the filtered restaurants after applying the filters
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]); // State to store the full list of restaurants fetched from the API
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch the list of restaurants when the component mounts
  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true); // Set loading to true while fetching
      const resList = await fetchRestaurants(); // Fetch the restaurant data from the API and update the state

      // Fetch the open status for each restaurant in parallel
      // This is done using Promise.all to ensure all requests are completed before updating the state
      const resWithStatus = await Promise.all(
        resList.map(async (restaurant) => {
          try {
            const status = await fetchOpenStatus(restaurant.id);
            return { ...restaurant, isOpen: status?.is_open ?? false };
          } catch (err) {
            console.error("Error fetching open status:", err);
            return { ...restaurant, isOpen: false };
          }
        })
      );

      setAllRestaurants(resWithStatus); // Update the state with the full list of restaurants
      setLoading(false); // Set loading to false after fetching
    };
    loadRestaurants(); // Trigger the async function to load restaurants
  }, []); // Empty dependency array to ensure this runs only once when the component mounts

  // Filter the list of all restaurants whenever any of the filters change
  useEffect(() => {
    const filtered = filterRestaurants(
      allRestaurants,
      foodCategories,
      deliveryTimes,
      priceRanges
    ); // Apply the filters to the full list of restaurants

    // Sort the filtered list to show open restaurants first
    const sorted = filtered.sort(
      (a, b) => (b.isOpen ? 1 : 0) - (a.isOpen ? 1 : 0)
    );

    setRestaurants(sorted); // Update the state with the filtered and sorted list
  }, [foodCategories, deliveryTimes, priceRanges, allRestaurants]); // Runs when filters or the list of all restaurants change

  return (
    <div className="col-span-12 max-md:pr-6 max-md:pb-10 max-md:mt-6">
      <h1 className="text-display">Restaurant’s</h1>
      {!loading && restaurants.length === 0 ? (
        <div className="grid grid-cols-12 items-center justify-center min-h-[300px]">
          <p className="text-display col-span-6">
            Oops.. Looks like there's no food on the menu for these filters.
          </p>
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
