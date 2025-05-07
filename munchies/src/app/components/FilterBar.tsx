"use client";
import React from "react";
import { Filter } from "../types/index";
import Tag from "./Tag";

type Props = {
  availableFilters: Filter[];
  availablePriceRanges: { id: string; range: string }[];
  selectedFilters: string[];
  setFilters: (filters: string[]) => void;
  selectedDeliveryTimes: string[];
  setDeliveryTimes: (times: string[]) => void;
  selectedPriceRanges: string[];
  setPriceRanges: (ranges: string[]) => void;
};

const deliveryOptions = [
  { label: "0-10 min", value: "0-10" },
  { label: "10-30 min", value: "10-30" },
  { label: "30-60 min", value: "30-60" },
  { label: "+1 hour", value: "60-null" },
];

const FilterBar: React.FC<Props> = ({
  availableFilters,
  availablePriceRanges,
  selectedFilters,
  setFilters,
  selectedDeliveryTimes,
  setDeliveryTimes,
  selectedPriceRanges,
  setPriceRanges,
}) => {
  const toggleFilter = (id: string) => {
    setFilters(
      selectedFilters.includes(id)
        ? selectedFilters.filter((f) => f !== id)
        : [...selectedFilters, id]
    );
  };

  const toggleDeliveryTime = (value: string) => {
    setDeliveryTimes(
      selectedDeliveryTimes.includes(value)
        ? selectedDeliveryTimes.filter((v) => v !== value)
        : [...selectedDeliveryTimes, value]
    );
  };

  const togglePriceRange = (id: string) => {
    setPriceRanges(
      selectedPriceRanges.includes(id)
        ? selectedPriceRanges.filter((v) => v !== id)
        : [...selectedPriceRanges, id]
    );
  };

  return (
    <div className="flex flex-col mb-6 md:p-6 md:bg-white md:rounded-[10px] md:border border-stroke">
      <h2 className="hidden md:block text-h1 pb-8">Filter</h2>

      <div className="md:pb-8">
        <h3 className="pb-4 uppercase text-body text-black opacity-40 font-[500]">Food category</h3>
        <div className="hidden md:block">
          {availableFilters.slice(0, 4).map((filter) => (
            <Tag
              key={filter.id}
              title={filter.name}
              onClick={() => toggleFilter(filter.id)}
              className={`cursor-pointer md:mb-2.5 ${
                selectedFilters.includes(filter.id) ? "bg-black text-white" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="md:pb-8">
        <h3 className="pb-4 uppercase text-body text-black opacity-40 font-[500]">Delivery time</h3>
        <div className="flex gap-2 flex-wrap">
          {deliveryOptions.map((option) => (
            <Tag
              key={option.value}
              title={option.label}
              onClick={() => toggleDeliveryTime(option.value)}
              className={`cursor-pointer md:mb-2.5 ${
                selectedDeliveryTimes.includes(option.value) ? "bg-black text-white" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="md:pb-8">
        <h3 className="pb-4 uppercase text-body text-black opacity-40 font-[500]">Price range</h3>
        <div className="hidden md:flex gap-2 flex-wrap">
          {availablePriceRanges.map((range) => (
            <Tag
              key={range.id}
              title={range.range}
              onClick={() => togglePriceRange(range.id)}
              className={`cursor-pointer md:mb-2.5 ${
                selectedPriceRanges.includes(range.id) ? "bg-black text-white" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
