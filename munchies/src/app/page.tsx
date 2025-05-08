"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FilterBar from "./components/Filter/FilterBar";
import RestaurantList from "./components/Restaurant/RestaurantList";
import FilterSlider from "./components/Filter/FilterSlider";
import Image from "next/image";
import useFilters from "./hooks/useFilters";
import useData from "./hooks/useData";

export default function Home() {
  const { filters, setFilters, deliveryTimes, setDeliveryTimes, priceRanges, setPriceRanges } = useFilters();
  const { availableFilters, availablePriceRanges } = useData();

  const router = useRouter();
 
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.length) params.set("filters", filters.join(","));
    if (deliveryTimes.length) params.set("deliveryTimes", deliveryTimes.join(","));
    if (priceRanges.length) params.set("priceRanges", priceRanges.join(","));

    const queryString = params.toString();
    router.replace(`?${queryString}`, { scroll: false });
  }, [filters, deliveryTimes, priceRanges, router]);

  return (
    <main className="bg-offWhite">
      <div className="pl-6 pt-[40px] md:pl-10 md:pt-14">
        <span className="block h-fit pb-[24px] md:pb-[48px]">
          <Image
            src="/icons/logo_black.svg"
            alt="Logo"
            fill
            className="!h-[24px] md:!h-[40px] !w-auto !relative object-contain"
            priority
          />
        </span>

        <div className="block md:grid grid-cols-16 gap-x-5">
          <div className="col-span-3">
        <FilterBar
          availableFilters={availableFilters}
          availablePriceRanges={availablePriceRanges}
          selectedFilters={filters}
          setFilters={setFilters}
          selectedDeliveryTimes={deliveryTimes}
          setDeliveryTimes={setDeliveryTimes}
          selectedPriceRanges={priceRanges}
          setPriceRanges={setPriceRanges}
        />
          </div>
          <div className="col-span-13">
        <div className="md:grid grid-cols-13 gap-y-10">
          <div className="col-span-13">
            <FilterSlider
              selectedFilters={filters}
              setSelectedFilters={setFilters}
            />
          </div>
          <div className="col-span-12">
            <RestaurantList
              filters={filters}
              deliveryTimes={deliveryTimes}
              priceRanges={priceRanges}
            />
          </div>
        </div>
          </div>
        </div>
      </div>
    </main>
  );
}
