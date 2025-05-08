import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

/** Custom hook to manage filter states based on URL search parameters */
const useFilters = () => {
  const searchParams = useSearchParams(); // Hook to access query parameters from the URL

  // State to store selected filter values
  const [foodCategories, setFoodCategories] = useState<string[]>([]);
  const [deliveryTimes, setDeliveryTimes] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);

  // Effect that runs whenever the URL search parameters change
  useEffect(() => {
    // Extract query params for each filter type
    const categoryParam = searchParams.get("foodCategories")
    const deliveryParam = searchParams.get("deliveryTimes");
    const priceParam = searchParams.get("priceRanges");

    // Update filter states by splitting comma-separated values
    setFoodCategories(categoryParam ? categoryParam.split(",") : []);
    setDeliveryTimes(deliveryParam ? deliveryParam.split(",") : []);
    setPriceRanges(priceParam ? priceParam.split(",") : []);
  }, [searchParams]); // Re-run when search parameters change

  // Return both the values and their setters so they can be used and updated externally
  return { 
    foodCategories, 
    setFoodCategories, 
    deliveryTimes, 
    setDeliveryTimes, 
    priceRanges, 
    setPriceRanges 
  };
};

export default useFilters;