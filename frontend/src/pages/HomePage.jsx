import React, { useEffect } from "react";
import CategoryItems from "./CategoryItems";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/tshirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Explore Our Collection
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover a wide range of stylish clothing and accessories for every
          occasion.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItems category={category} key={category.name} />
          ))}
        </div>
        {!isLoading && products.length > 0 && (
          <FeaturedProducts FeaturedProducts={products} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
