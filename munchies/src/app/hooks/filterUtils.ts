import { Restaurant } from "../types";

/** Function to filter a list of restaurants based on selected categories, delivery times, and price ranges */
export const filterRestaurants = (
    restaurants: Restaurant[],
    foodCategories: string[],
    deliveryTimes: string[],
    priceRanges: string[]
  ): Restaurant[] => {
    let filtered = [...restaurants]; // Create a shallow copy of the original list to avoid mutating it
  
    // Filter by selected food categories (if any)
    if (foodCategories.length) {
      filtered = filtered.filter((r) =>
        r.filter_ids.some((id) => foodCategories.includes(id)) // Keep restaurant if it matches any selected category
      );
    }
  
    // Filter by selected delivery time ranges (if any)
    if (deliveryTimes.length) {
      filtered = filtered.filter((r) =>
        deliveryTimes.some((range) => {
          const [minStr, maxStr] = range.split("-"); // Split the time range string into min and max values
          const min = parseInt(minStr, 10); // Convert min to number
          const max = maxStr === "null" ? Infinity : parseInt(maxStr, 10); // Convert max or set to Infinity if "null"
          return r.delivery_time_minutes >= min && r.delivery_time_minutes <= max; // Check if the restaurant's delivery time is within the selected range
        })
      );
    }
  
    // Filter by selected price ranges (if any)
    if (priceRanges.length) {
      filtered = filtered.filter((r) =>
        priceRanges.includes(r.price_range_id) // Keep restaurant if its price range matches a selected one
      );
    }
  
    return filtered; // Return the filtered list of restaurants
  };