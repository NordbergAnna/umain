import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Custom hook to synchronize filter state with the URL query parameters */
const useSyncFiltersWithURL = ({
  foodCategories,
  deliveryTimes,
  priceRanges,
}: {
  // Currently selected filters in each filter category
  foodCategories: string[];
  deliveryTimes: string[];
  priceRanges: string[];
}) => {
  const router = useRouter(); // Hook for programmatic navigation

  useEffect(() => {
    const params = new URLSearchParams(); // Create a new URLSearchParams instance to build the query string

    // Only include parameters in the URL if their arrays are non-empty
    if (foodCategories.length)
      params.set("foodCategories", foodCategories.join(","));
    if (deliveryTimes.length)
      params.set("deliveryTimes", deliveryTimes.join(","));
    if (priceRanges.length) params.set("priceRanges", priceRanges.join(","));

    const queryString = params.toString(); // Convert params object to a query string
    router.replace(`?${queryString}`, { scroll: false }); // Replace the current URL with the new query string, but don't scroll the page up
  }, [foodCategories, deliveryTimes, priceRanges, router]); // Effect dependency array ensures this runs when any of the filter arrays change
};

export default useSyncFiltersWithURL;
