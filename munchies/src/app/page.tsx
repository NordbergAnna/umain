"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  fetchFilters,
  fetchAllPriceRanges,
} from "./lib/api";
import { Filter } from "./types";
import FilterBar from "./components/FilterBar";
import RestaurantList from "./components/RestaurantList";
import FilterSlider from "./components/FilterSlider";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<string[]>([]);
  const [deliveryTimes, setDeliveryTimes] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);

  const [availableFilters, setAvailableFilters] = useState<Filter[]>([]);
  const [availablePriceRanges, setAvailablePriceRanges] = useState<
    { id: string; range: string }[]
  >([]);


  useEffect(() => {
    const filterParam = searchParams.get("filters");
    const deliveryParam = searchParams.get("deliveryTimes");
    const priceParam = searchParams.get("priceRanges");

    setFilters(filterParam ? filterParam.split(",") : []);
    setDeliveryTimes(deliveryParam ? deliveryParam.split(",") : []);
    setPriceRanges(priceParam ? priceParam.split(",") : []);
  }, [searchParams]);

 
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.length) params.set("filters", filters.join(","));
    if (deliveryTimes.length) params.set("deliveryTimes", deliveryTimes.join(","));
    if (priceRanges.length) params.set("priceRanges", priceRanges.join(","));

    const queryString = params.toString();
    router.replace(`?${queryString}`, { scroll: false });
  }, [filters, deliveryTimes, priceRanges, router]);

 
  useEffect(() => {
    const loadData = async () => {
      const [filterList, priceList] = await Promise.all([
        fetchFilters(),
        fetchAllPriceRanges(),
      ]);
      setAvailableFilters(filterList);
      setAvailablePriceRanges(priceList);
    };
    loadData();
  }, []);

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
