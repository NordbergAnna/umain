import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const useFilters = () => {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<string[]>([]);
  const [deliveryTimes, setDeliveryTimes] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);

  useEffect(() => {
    const filterParam = searchParams.get("filters");
    const deliveryParam = searchParams.get("deliveryTimes");
    const priceParam = searchParams.get("priceRanges");

    setFilters(filterParam ? filterParam.split(",") : []);
    setDeliveryTimes(deliveryParam ? deliveryParam.split(",") : []);
    setPriceRanges(priceParam ? priceParam.split(",") : []);
  }, [searchParams]);

  return { filters, setFilters, deliveryTimes, setDeliveryTimes, priceRanges, setPriceRanges };
};

export default useFilters;
