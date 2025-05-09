import Image from "next/image";
import { Restaurant } from "../types";
import Tag from "./Tag";
import { deliveryOptions } from "../lib/constants";

const BASE_URL = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app"; // Base URL for image paths

/** RestaurantCard component displays details about a restaurant */
const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
const imageUrl = `${BASE_URL}${restaurant.image_url}`; // Constructs the full URL for the image
const isOpen = restaurant.isOpen; // Determines if the restaurant is open

  // Function to get the delivery time label based on the delivery time in minutes
  const getDeliveryTimeLabel = (minutes: number): string => {
    const option = deliveryOptions.find(
      (opt) => minutes >= opt.min && (opt.max === null || minutes <= opt.max)
    );
    return option ? option.label : `${minutes} min`;
  };

  return (
    <div className="relative overflow-hidden flex flex-col justify-between bg-white min-h-52 rounded-lg border border-stroke">
      {!isOpen && (
        <div className="absolute inset-0 bg-white opacity-90 z-20 flex items-center justify-center">
          <div className="z-30 py-2 px-3 bg-offWhite border border-stroke rounded-[4px] text-body">
            Opens tomorrow at 12 pm
          </div>
        </div>
      )}
      <span className="pt-4 pl-4 flex gap-x-2">
        <Tag
          title={isOpen ? "Open" : "Closed"}
          className="py-2 px-3 rounded-[88px]"
        />
        <Tag
          title={getDeliveryTimeLabel(restaurant.delivery_time_minutes)}
          className="py-2 px-3 rounded-[88px]"
        />
      </span>
      <span className="absolute top-[-28px] right-[-28px] z-10">
        <Image
          src={imageUrl}
          alt={`Restaurant image for ${restaurant.name}`}
          height={140}
          width={140}
          className="rounded-lg"
        />
      </span>
      <div className="flex justify-between items-center px-4 pb-4 text-h1">
        {restaurant.name}{" "}
        <span>
          <img src="/icons/CTA.svg" />
        </span>
      </div>
    </div>
  );
};

export default RestaurantCard;
