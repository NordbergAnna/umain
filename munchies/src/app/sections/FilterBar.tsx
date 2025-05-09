"use client";
import Tag from "../components/Tag";
import type { FilterBarProps } from "../types";
import { deliveryOptions } from "@/app/lib/constants";

const filterClass =
  "py-2 px-3 text-body rounded-lg border-[0.6px] border-stroke cursor-pointer";
const selectedFilterClass = "bg-black text-white";

/** FilterBar component definition */
const FilterBar = ({
  availableFilters,
  availablePriceRanges,
  selectedFoodCategories,
  setFoodCategories,
  selectedDeliveryTimes,
  setDeliveryTimes,
  selectedPriceRanges,
  setPriceRanges,
}: FilterBarProps) => {
  /** Toggles selection for a food category */
  const toggleFilter = (id: string) => {
    setFoodCategories(
      selectedFoodCategories.includes(id)
        ? selectedFoodCategories.filter((f) => f !== id) // Remove if already selected
        : [...selectedFoodCategories, id] // Add if not selected
    );
  };

  /** Toggles selection for a delivery time */
  const toggleDeliveryTime = (value: string) => {
    setDeliveryTimes(
      selectedDeliveryTimes.includes(value)
        ? selectedDeliveryTimes.filter((v) => v !== value)
        : [...selectedDeliveryTimes, value]
    );
  };

  /** Toggles selection for a price range */
  const togglePriceRange = (id: string) => {
    setPriceRanges(
      selectedPriceRanges.includes(id)
        ? selectedPriceRanges.filter((v) => v !== id)
        : [...selectedPriceRanges, id]
    );
  };

  return (
    <div className="flex flex-col mb-6 md:p-6 md:bg-white md:rounded-[10px] md:border border-stroke md:h-screen">
      <h2 className="hidden md:block text-h1 pb-8">Filter</h2>
      <div className="hidden md:block md:pb-8">
        <h3 className="pb-4 uppercase text-body text-black opacity-40 font-[500]">
          Food category
        </h3>
        <div className="block">
          {availableFilters.slice(0, 4).map((category) => (
            <Tag
              key={category.id}
              title={category.name}
              onClick={() => toggleFilter(category.id)}
              className={`${filterClass} ${
                selectedFoodCategories.includes(category.id)
                  ? selectedFilterClass
                  : ""
              } md:mb-2.5`}
            />
          ))}
        </div>
      </div>

      <div className="md:pb-8">
        <h3 className="pb-4 uppercase text-body text-black opacity-40 font-medium">
          Delivery time
        </h3>
        <div className="flex gap-2 flex-wrap">
          {deliveryOptions.map((option) => (
            <Tag
              key={option.value}
              title={option.label}
              onClick={() => toggleDeliveryTime(option.value)}
              className={`${filterClass} ${
                selectedDeliveryTimes.includes(option.value)
                  ? selectedFilterClass
                  : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:block md:pb-8">
        <h3 className="pb-4 uppercase text-body text-black opacity-40 font-medium">
          Price range
        </h3>
        <div className="flex gap-2 flex-wrap">
          {availablePriceRanges.map((range) => (
            <Tag
              key={range.id}
              title={range.range}
              onClick={() => togglePriceRange(range.id)}
              className={`${filterClass} ${
                selectedPriceRanges.includes(range.id)
                  ? selectedFilterClass
                  : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
