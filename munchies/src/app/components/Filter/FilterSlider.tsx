"use client";

import { useEffect, useState } from "react";
import type { Filter, FilterSliderProps } from "../../types";
import { fetchFilters } from "../../lib/api";
import Image from "next/image";

const BASE_URL = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app";

const FilterSlider = ({ selectedFilters, setSelectedFilters }: FilterSliderProps) => {
    const [filters, setFilters] = useState<Filter[]>([]);
  
    useEffect(() => {
      const fetchFiltersData = async () => {
        const data = await fetchFilters();
        setFilters(data);
      };
      fetchFiltersData();
    }, []);
  
    const toggleFilter = (id: string) => {
      setSelectedFilters(
        selectedFilters.includes(id)
          ? selectedFilters.filter((f) => f !== id)
          : [...selectedFilters, id]
      );
    }

 return (
    <div className="flex gap-x-2.5 overflow-x-scroll whitespace-nowrap hide-scrollbar pr-[24px]">
    {filters.map((filter) => {

        const imageUrl = `${BASE_URL}${filter.image_url}`;
        const isSelected = selectedFilters.includes(filter.id);
        const isAnySelected = selectedFilters.length > 0;

        return (
            <button
                className={`flex justify-between min-w-[160px] h-[80px] bg-white border border-stroke rounded-[8px] cursor-pointer transition-opacity duration-100 ${isAnySelected && !isSelected ? "opacity-50" : "opacity-100"}`}
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                >
                <span className="text-title pl-3 pt-4">{filter.name}</span>
                <Image
                    src={imageUrl}
                    alt={filter.name}
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
