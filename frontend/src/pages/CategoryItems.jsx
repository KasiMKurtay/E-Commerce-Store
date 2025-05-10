import React from "react";
import { Link } from "react-router-dom";

const CategoryItems = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-96 w-full rounded-lg group hover:shadow-xl transition-shadow duration-300">
      <Link to={`/category` + category.href}>
        {" "}
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900 opacity-90 z-10" />

          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 space-y-1">
            <h3 className="text-white text-2xl font-bold drop-shadow-lg">
              {category.name}
            </h3>
            <p className="text-gray-300 text-sm font-medium">
              {category.itemCount || "Explore Collection"}
            </p>
            <button className="mt-2 px-4 py-1.5 text-xs font-semibold bg-white/90 text-gray-900 rounded-full hover:bg-white transition-colors duration-200">
              Shop Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItems;
