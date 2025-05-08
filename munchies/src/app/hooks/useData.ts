import { useState, useEffect } from "react";
import { fetchFilters, fetchAllPriceRanges } from "../lib/api";
import { Filter } from "../types";

/** Custom hook to fetch and return food categories, delivery time and price range data */
const useData = () => {
  const [availableFilters, setAvailableFilters] = useState<Filter[]>([]); // State to store fetched filters
  const [availablePriceRanges, setAvailablePriceRanges] = useState<
    { id: string; range: string }[]
  >([]); // State to store fetched price ranges (e.g., { id: "1", range: "$" })

  // Fetch filters and price ranges once when the component using this hook mounts
  useEffect(() => {
    const loadData = async () => {
      // Run both fetch operations in parallel
      const [filterList, priceList] = await Promise.all([
        fetchFilters(), // Fetch filters
        fetchAllPriceRanges(), // Fetch available price ranges
      ]);
      // Store the results in state
      setAvailableFilters(filterList);
      setAvailablePriceRanges(priceList);
    };
    loadData(); // Call the async function
  }, []); // Empty dependency array ensures this runs only once

  return { availableFilters, availablePriceRanges }; // Return the fetched data so components using this hook can access it
};

export default useData;
