import { Restaurant, Filter } from "../types/index";

const BASE_URL = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api";

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const res = await fetch(`${BASE_URL}/restaurants`);
  const data = await res.json();
  return data.restaurants;
};

export const fetchFilters = async (): Promise<Filter[]> => {
  const res = await fetch(`${BASE_URL}/filter`);
  const data = await res.json();
  return data.filters;
};

export const fetchOpenStatus = async (restaurantId: string) => {
    const response = await fetch(
      `https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/open/${restaurantId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch open status");
    }
    const data = await response.json();
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
      const data = await res.json();
      return { id, range: data.range };
    })
  );
  return prices;
};
