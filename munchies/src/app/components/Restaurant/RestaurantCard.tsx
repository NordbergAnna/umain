import Image from "next/image";
import { Restaurant } from "../../types";
import { useState, useEffect } from "react";
import { fetchOpenStatus } from "../../lib/api";
import Tag from "../Tag";

const BASE_URL = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app"; // Base URL for image paths

/** RestaurantCard component displays details about a restaurant */
const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const imageUrl = `${BASE_URL}${restaurant.image_url}`; // Constructs the full URL for the image
  const [isOpen, setIsOpen] = useState<boolean | null>(null); // State to track whether the restaurant is open or not

  // useEffect hook to check the restaurant's open status when the component mounts
  useEffect(() => {
    const checkOpenStatus = async () => {
        try {
          const status = await fetchOpenStatus(restaurant.id); // Fetches the open status from the API
          if (status) {
            setIsOpen(status.is_open); // Sets the state based on the fetched status
          }
        } catch (error) {
          console.error("Error fetching open status:", error); // Handles any errors in the fetching process
          setIsOpen(false); // If there’s an error, assume the restaurant is closed
        }
      };
      checkOpenStatus();
  }, [restaurant.id]); // Runs when the restaurant.id changes

  return (
    <div className="relative overflow-hidden flex flex-col justify-between bg-white min-h-52 rounded-[8px] border border-stroke">
        {!isOpen && (
            <div className="absolute inset-0 bg-white opacity-90 z-20 flex items-center justify-center">
                <div className="z-30 py-2 px-3 bg-offWhite border border-stroke rounded-[4px] text-body">Opens tomorrow at 12 pm</div>
            </div>
        )}
        <span className="pt-4 pl-4 flex gap-x-2">
            <Tag title={isOpen ? "Open" : "Closed"} className="py-2 px-3 rounded-[88px]" />
            <Tag title={restaurant.delivery_time_minutes + " min"} className="py-2 px-3 rounded-[88px]" />
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
        {restaurant.name} <span><img src="/icons/CTA.svg"/></span>
        </div>
    </div>
  );
};

export default RestaurantCard;