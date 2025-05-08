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
    selectedFilters: string[];
    setFilters: (filters: string[]) => void;
    selectedDeliveryTimes: string[];
    setDeliveryTimes: (times: string[]) => void;
    selectedPriceRanges: string[];
    setPriceRanges: (ranges: string[]) => void;
  };

  export interface FilterSliderProps {
    selectedFilters: string[];
    setSelectedFilters: (filters: string[]) => void;
  };

  export interface RestaurantsListProps {
    filters: string[];
    deliveryTimes: string[];
    priceRanges: string[];
  }