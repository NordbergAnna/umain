"use client";

import { useEffect, useState } from "react";
import type { Filter, FilterSliderProps } from "../../types";
import { fetchFilters } from "../../lib/api";
import Image from "next/image";

const BASE_URL = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app"; // Base URL for image paths

/** Component to display a horizontally scrollable slider of filter buttons with images */
const FilterSlider = ({
  selectedFoodCategories,
  setFoodCategories,
}: FilterSliderProps) => {
  const [categories, setCategories] = useState<Filter[]>([]); // State to store fetched filter categories

  // Fetch filter categories from API on component mount
  useEffect(() => {
    const fetchFiltersData = async () => {
      const data = await fetchFilters();
      setCategories(data);
    };
    fetchFiltersData();
  }, []);

  // Toggles a food category selection on click
  const toggleFilter = (id: string) => {
    setFoodCategories(
      selectedFoodCategories.includes(id)
        ? selectedFoodCategories.filter((f) => f !== id) // Remove if already selected
        : [...selectedFoodCategories, id] // Add if not selected
    );
  };

  return (
    <div className="flex gap-x-2.5 overflow-x-scroll whitespace-nowrap hide-scrollbar pr-6">
      {categories.map((category) => {
        const imageUrl = `${BASE_URL}${category.image_url}`; // Construct full image URL
        const isSelected = selectedFoodCategories.includes(category.id); // Check if this category is selected
        const isAnySelected = selectedFoodCategories.length > 0; // Used to dim unselected items if one is selected

        return (
          <button
            className={`flex justify-between min-w-40 h-20 bg-white border border-stroke rounded-lg cursor-pointer transition-opacity duration-100 ${
              isAnySelected && !isSelected ? "opacity-50" : "opacity-100"
            }`}
            key={category.id}
            onClick={() => toggleFilter(category.id)}
          >
            <span className="text-title pl-3 pt-4">{category.name}</span>
            <Image src={imageUrl} alt={category.name} width={80} height={80} />
          </button>
        );
      })}
    </div>
  );
};

export default FilterSlider;
