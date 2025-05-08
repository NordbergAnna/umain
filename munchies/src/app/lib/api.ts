import { Restaurant, Filter } from "../types/index";
import { BASE_URL } from '../../../config';

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const res = await fetch(`${BASE_URL}/restaurants`);
  if (!res.ok) {
    throw new Error("Failed to fetch restaurants");
  }
  const data = await res.json();
  return data.restaurants;
};

export const fetchFilters = async (): Promise<Filter[]> => {
  const res = await fetch(`${BASE_URL}/filter`);
  if (!res.ok) {
    throw new Error("Failed to fetch filters");
  }
  const data = await res.json();
  return data.filters;
};

export const fetchOpenStatus = async (restaurantId: string) => {
    const res = await fetch(
      `${BASE_URL}/open/${restaurantId}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch open status");
    }
    const data = await res.json();
    return data;
  };
  

export const fetchAllPriceRanges = async (): Promise<
  { id: string; range: string }[]
> => {
  const restaurants = await fetchRestaurants();
  const uniqueIds = [...new Set(restaurants.map((r) => r.price_range_id))];
  const prices = await Promise.all(
    uniqueIds.map(async (id) => {
      const res = await fetch(`${BASE_URL}/price-range/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch price ranges");
      }
      const data = await res.json();
      return { id, range: data.range };
    })
  );
  return prices;
};
