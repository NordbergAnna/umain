import { Restaurant, Filter } from "../types/index";
import { BASE_URL } from '../../../config'; // Get the Base url from config with api path

/** Fetch the full list of restaurants from the API */
export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const res = await fetch(`${BASE_URL}/restaurants`);
  if (!res.ok) { // Throw an error if the request fails
    throw new Error("Failed to fetch restaurants");
  }
  const data = await res.json();
  return data.restaurants; // Return the restaurant array from the response
};

/** Fetch available food category filters from the API */
export const fetchFilters = async (): Promise<Filter[]> => {
  const res = await fetch(`${BASE_URL}/filter`);
  if (!res.ok) {
    throw new Error("Failed to fetch filters");
  }
  const data = await res.json();
  return data.filters; // Return the filters array from the response
};

/** Fetch open/closed status of a specific restaurant by ID */
export const fetchOpenStatus = async (restaurantId: string) => {
    const res = await fetch(
      `${BASE_URL}/open/${restaurantId}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch open status");
    }
    const data = await res.json();
    return data; // Expected to return an object like { isOpen: true }
  };
  

/** Fetch all unique price ranges based on restaurant data */
export const fetchAllPriceRanges = async (): Promise<
  { id: string; range: string }[]
> => {
  // Step 1: Get all restaurants
  const restaurants = await fetchRestaurants();

  // Step 2: Extract all unique price range IDs
  const uniqueIds = [...new Set(restaurants.map((r) => r.price_range_id))];

  // Step 3: Fetch price label/description for each unique price range ID
  const prices = await Promise.all(
    uniqueIds.map(async (id) => {
      const res = await fetch(`${BASE_URL}/price-range/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch price ranges");
      }
      const data = await res.json();
      return { id, range: data.range }; // Return object with id and range label
    })
  );
  return prices; // Return the complete array of price ranges
};
