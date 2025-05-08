"use client";

import { useEffect, useState } from "react";
import type { Filter, FilterSliderProps } from "../../types";
import { fetchFilters } from "../../lib/api";
import Image from "next/image";

const BASE_URL = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app";

const FilterSlider = ({ selectedFoodCategories, setFoodCategories }: FilterSliderProps) => {
    const [categories, setCategories] = useState<Filter[]>([]);
  
    useEffect(() => {
      const fetchFiltersData = async () => {
        const data = await fetchFilters();
        setCategories(data);
      };
      fetchFiltersData();
    }, []);
  
    const toggleFilter = (id: string) => {
      setFoodCategories(
        selectedFoodCategories.includes(id)
          ? selectedFoodCategories.filter((f) => f !== id)
          : [...selectedFoodCategories, id]
      );
    }

 return (
    <div className="flex gap-x-2.5 overflow-x-scroll whitespace-nowrap hide-scrollbar pr-[24px]">
    {categories.map((category) => {

        const imageUrl = `${BASE_URL}${category.image_url}`;
        const isSelected = selectedFoodCategories.includes(category.id);
        const isAnySelected = selectedFoodCategories.length > 0;

        return (
            <button
                className={`flex justify-between min-w-[160px] h-[80px] bg-white border border-stroke rounded-[8px] cursor-pointer transition-opacity duration-100 ${isAnySelected && !isSelected ? "opacity-50" : "opacity-100"}`}
                key={category.id}
                onClick={() => toggleFilter(category.id)}
                >
                <span className="text-title pl-3 pt-4">{category.name}</span>
                <Image
                    src={imageUrl}
                    alt={category.name}
                    width={80}
                    height={80}
                />
            </button>
        );
    })}
</div>
 )

};

export default FilterSlider;
