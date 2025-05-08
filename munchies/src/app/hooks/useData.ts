import { useState, useEffect } from "react";
import { fetchFilters, fetchAllPriceRanges } from "../lib/api";
import { Filter } from "../types";

const useData = () => {
  const [availableFilters, setAvailableFilters] = useState<Filter[]>([]);
  const [availablePriceRanges, setAvailablePriceRanges] = useState<{ id: string; range: string }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [filterList, priceList] = await Promise.all([
        fetchFilters(),
        fetchAllPriceRanges(),
      ]);
      setAvailableFilters(filterList);
      setAvailablePriceRanges(priceList);
    }
    loadData();
  }, []);

  return { availableFilters, availablePriceRanges };
};

export default useData;
