import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useSyncFiltersWithURL = ({
  foodCategories,
  deliveryTimes,
  priceRanges,
}: {
  foodCategories: string[];
  deliveryTimes: string[];
  priceRanges: string[];
}) => {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();

    if (foodCategories.length) params.set("foodCategories", foodCategories.join(","));
    if (deliveryTimes.length) params.set("deliveryTimes", deliveryTimes.join(","));
    if (priceRanges.length) params.set("priceRanges", priceRanges.join(","));

    const queryString = params.toString();
    router.replace(`?${queryString}`, { scroll: false });
  }, [foodCategories, deliveryTimes, priceRanges, router]);
};

export default useSyncFiltersWithURL;