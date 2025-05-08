"use client";

import FilterBar from "./components/Filter/FilterBar";
import RestaurantList from "./components/Restaurant/RestaurantList";
import FilterSlider from "./components/Filter/FilterSlider";
import Image from "next/image";
import useFilters from "./hooks/useFilters";
import useSyncFiltersWithURL from "./hooks/useSyncFiltersWithUrl";
import useData from "./hooks/useData";
import MobileOverlay from "./components/MobileOverlay";

export default function Home() {
  // Destructure the states and setters from the `useFilters` hook
  const { 
    foodCategories, 
    setFoodCategories, 
    deliveryTimes, 
    setDeliveryTimes, 
    priceRanges, 
    setPriceRanges 
  } = useFilters();

  const { availableFilters, availablePriceRanges } = useData(); // Fetch available filter options like food categories, delivery time and price ranges

  useSyncFiltersWithURL({ foodCategories, deliveryTimes, priceRanges }); // Synchronize the filter states with the URL query parameters

  return (
    <main className="bg-offWhite">
      <MobileOverlay />
      <div className="pl-6 pt-[40px] md:pl-10 md:pt-14">
        <span className="block h-fit pb-6 md:pb-12">
          <Image
            src="/icons/logo_black.svg"
            alt="Logo"
            fill
            className="!h-6 md:!h-10 !w-auto !relative object-contain"
            priority
          />
        </span>

        <div className="block md:grid grid-cols-16 gap-x-5">
          <div className="col-span-3">
        <FilterBar
          availableFilters={availableFilters}
          availablePriceRanges={availablePriceRanges}
          selectedFoodCategories={foodCategories}
          setFoodCategories={setFoodCategories}
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
              selectedFoodCategories={foodCategories}
              setFoodCategories={setFoodCategories}
            />
          </div>
          <div className="col-span-12">
            <RestaurantList
              foodCategories={foodCategories}
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
