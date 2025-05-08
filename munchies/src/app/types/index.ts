/* Types */

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
}

export interface Filter {
  id: string;
  name: string;
  image_url: string;
}

export interface FilterBarProps {
  availableFilters: Filter[];
  availablePriceRanges: { id: string; range: string }[];
  selectedFoodCategories: string[];
  setFoodCategories: (categories: string[]) => void;
  selectedDeliveryTimes: string[];
  setDeliveryTimes: (times: string[]) => void;
  selectedPriceRanges: string[];
  setPriceRanges: (ranges: string[]) => void;
}

export interface FilterSliderProps {
  selectedFoodCategories: string[];
  setFoodCategories: (categories: string[]) => void;
}

export interface RestaurantsListProps {
  foodCategories: string[];
  deliveryTimes: string[];
  priceRanges: string[];
}
