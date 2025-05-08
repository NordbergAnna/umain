import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const useFilters = () => {
  const searchParams = useSearchParams();

  const [foodCategories, setFoodCategories] = useState<string[]>([]);
  const [deliveryTimes, setDeliveryTimes] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);

  useEffect(() => {
    const categoryParam = searchParams.get("foodCategories")
    const deliveryParam = searchParams.get("deliveryTimes");
    const priceParam = searchParams.get("priceRanges");

    setFoodCategories(categoryParam ? categoryParam.split(",") : []);
    setDeliveryTimes(deliveryParam ? deliveryParam.split(",") : []);
    setPriceRanges(priceParam ? priceParam.split(",") : []);
  }, [searchParams]);

  return { foodCategories, setFoodCategories, deliveryTimes, setDeliveryTimes, priceRanges, setPriceRanges };
};

export default useFilters;