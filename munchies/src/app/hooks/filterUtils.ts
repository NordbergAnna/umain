import { Restaurant } from "../types";

export const filterRestaurants = (
    restaurants: Restaurant[],
    filters: string[],
    deliveryTimes: string[],
    priceRanges: string[]
  ): Restaurant[] => {
    let filtered = [...restaurants];
  
    if (filters.length) {
      filtered = filtered.filter((r) =>
        r.filter_ids.some((id) => filters.includes(id))
      );
    }
  
    if (deliveryTimes.length) {
      filtered = filtered.filter((r) =>
        deliveryTimes.some((range) => {
          const [minStr, maxStr] = range.split("-");
          const min = parseInt(minStr, 10);
          const max = maxStr === "null" ? Infinity : parseInt(maxStr, 10);
          return r.delivery_time_minutes >= min && r.delivery_time_minutes <= max;
        })
      );
    }
  
    if (priceRanges.length) {
      filtered = filtered.filter((r) =>
        priceRanges.includes(r.price_range_id)
      );
    }
  
    return filtered;
  };